import { toJson } from './modules/to-json.js';
import { getPath } from './modules/get-path.js';
import { scanner } from './modules/scanner.js';
import { recreateDist } from './modules/recreate-dist.js';

const options = {
  src: 'src',
  dist: 'dist',
  max: {
    width: 1500,
    height: 1500,
  },
  nameJson: 'structure',
  noJson: false,
};

process.argv.slice(2).forEach((arg) => {
  const [param, value] = arg.split('=');
  if (param === 'no-json') options.noJson = true;
  if (param === 'name-json') options.nameJson = value;
  if (param === 'src') options.src = value;
  if (param === 'dist') options.dist = value;
  if (param === 'max-width') options.max.width = Number(value);
  if (param === 'max-height') options.max.height = Number(value);
});

if (options.noJson) {
  recreateDist(options.dist).then(() => {
    scanner(options.src, options.src, options.dist, options.max);
  });
} else {
  const nameJson = getPath(options.dist, `${options.nameJson}.json`);
  toJson(nameJson, options.dist).then(() => {
    console.info(`File ./${nameJson} generated!`);
  });
}
