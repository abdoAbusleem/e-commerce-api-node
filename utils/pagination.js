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
    queryWhere[Op.or] = searchFields.map(field => ({
      [field]: { [Op.iLike]: `%${search}%` },
    }));
  }

  const order = sort ? [[sort.key, sort.direction || 'ASC']] : [[key, orderDirection]];

  const rows = await model.findAll({
    where: queryWhere,
    order,
    limit: safeLimit + 1,
    include: includes,
  });

  if (before) rows.reverse();

  const hasNext = !before && rows.length > safeLimit;
  const hasPrevious = !!before || !!after;
  const data = rows.length > safeLimit ? rows.slice(0, -1) : rows;

  return {
    data,
    pageInfo: {
      hasNextPage: hasNext,
      hasPreviousPage: hasPrevious,
      nextCursor: data.length ? encodeCursor(data[data.length - 1][key]) : null,
      previousCursor: data.length ? encodeCursor(data[0][key]) : null,
      count: data.length,
    },
  };
}

module.exports = { paginateCursor };
