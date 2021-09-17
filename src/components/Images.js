const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
}, {});

const traitImages = importAll(require.context('../Assets/traits/', true, /\.png$/));
const champImages = importAll(require.context('../Assets/champions/', true, /\.png$/));
const itemImages = importAll(require.context('../Assets/items/', true, /\.png$/));
const profileImages = importAll(require.context('../Assets/profileicon/', false, /\.png$/));
const tierImages = importAll(require.context('../Assets/tier-icons/', false, /\.png$/));

export { traitImages, champImages, itemImages, profileImages, tierImages };