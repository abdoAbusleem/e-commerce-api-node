class BaseRepository {
  constructor(Model) {
    this.Model = Model;
  }

  create(data, options = {}) {
    return this.Model.create(data, options);
  }

  async findAll(options = {}) {
    const {
      page = 1,
      limit = 10,
      where = {},
      order = [['createdAt', 'DESC']],
      include = [],
      ...rest
    } = options;

    const offset = (page - 1) * limit;

    const result = await this.Model.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include,
      ...rest,
    });

    return {
      rows: result.rows,
      meta: {
        total: result.count,
        page,
        currentCount: result.rows.length,
        limit,
        totalPages: Math.ceil(result.count / limit),
      },
    };
  }

  findById(id, options = {}) {
    return this.Model.findByPk(id, options);
  }

  async findByIds(ids = [], options = {}) {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const foundIds = await this.Model.findAll({ where: { id: ids }, ...options });
    return foundIds;
  }

  async update(id, data, options = {}) {
    await this.Model.update(data, {
      where: { id },
      ...options,
      individualHooks: true,
      hooks: true,
    });

    return this.findById(id);
  }

  delete(id, options = {}) {
    return this.Model.destroy({ where: { id }, ...options });
  }

  forceDelete(id, options = {}) {
    return this.Model.destroy({ where: { id }, force: true, ...options });
  }

  restore(id, options = {}) {
    return this.Model.restore({ where: { id }, ...options });
  }

  async exists(id, options = {}) {
    const count = await this.Model.count({ where: { id }, ...options });
    return count > 0;
  }
}

module.exports = BaseRepository;
