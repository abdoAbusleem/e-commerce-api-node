const { Op } = require('sequelize');
const { encodeCursor, decodeCursor } = require('./cursor');

async function paginateCursor(model, options = {}) {
  const {
    after,
    before,
    limit = 10,
    key = 'createdAt',
    direction = 'DESC',
    where = {},
    search = null,
    searchFields = [],
    sort = null,
    includes = [],
    paranoid = true,
  } = options;

  const safeLimit = Math.max(1, Math.min(100, parseInt(limit)));

  const cursorWhere = {};
  let orderDirection = direction;

  if (after) {
    const decodedValue = decodeCursor(after);
    if (decodedValue) {
      cursorWhere[key] = {
        [direction === 'ASC' ? Op.gt : Op.lt]: decodedValue,
      };
    }
  } else if (before) {
    const decodedValue = decodeCursor(before);
    if (decodedValue) {
      cursorWhere[key] = {
        [direction === 'ASC' ? Op.lt : Op.gt]: decodedValue,
      };
      orderDirection = direction === 'ASC' ? 'DESC' : 'ASC';
    }
  }

  const queryWhere = { ...where, ...cursorWhere };

  if (search && searchFields.length) {
    queryWhere[Op.or] = searchFields.map(field => {
      if (field.includes('.')) {
        const [association, associationField] = field.split('.');
        return {
          [`$${association}.${associationField}$`]: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      return {
        [field]: { [Op.iLike]: `%${search}%` },
      };
    });
  }

  const order = sort ? [[sort.key, sort.direction || 'ASC']] : [[key, orderDirection]];

  const { rows, count: totalCount } = await model.findAndCountAll({
    where: queryWhere,
    order,
    limit: safeLimit + 1,
    include: includes,
    distinct: true,
    paranoid,
  });

  const processedRows = before ? rows.reverse() : rows;

  const hasNext = !before && processedRows.length > safeLimit;
  const hasPrevious = !!before || !!after;
  const data = processedRows.length > safeLimit ? processedRows.slice(0, -1) : processedRows;

  let nextCursor = null;
  let previousCursor = null;

  if (data.length > 0) {
    nextCursor = encodeCursor(data[data.length - 1][key]);
    previousCursor = encodeCursor(data[0][key]);
  }

  return {
    data,
    pageInfo: {
      hasNextPage: hasNext,
      hasPreviousPage: hasPrevious,
      nextCursor: hasNext ? nextCursor : null,
      previousCursor: hasPrevious ? previousCursor : null,
      count: data.length,
      totalCount,
    },
  };
}

module.exports = { paginateCursor };
