// Isso seria um banco real em produção
const links = {};

module.exports = {
  saveLink: (id, data) => {
    links[id] = data;
  },
  getLink: (id) => links[id],
};
