const cwd = process.cwd();

/*
  #!Author: Valentin vale@webdynamix.com
  creates multiple image sizes from x1 - x3 based on resolutions and breakpoints
  npm package: grunt-responsive-images
  CLI: GraphicsMagick
  enable: grunt.loadNpmTasks('grunt-responsive-images');
*/

module.exports = () => {
  const sizes = [];

  const resolutions = [
    { name: 'x1', ratio: 3 },
    { name: 'x2', ratio: 2 },
    { name: 'x3', ratio: 1 }];

  const breakpoints = {
    mobile: { size: 480, quality: 60 },
    tablet: { size: 768, quality: 60 },
    smalldesktop: { size: 1024, quality: 60 },
    desktop: { size: 1366, quality: 60 },
    widescreen: { size: 1920, quality: 60 }
  };

  for (const key in breakpoints) {
    if (breakpoints.hasOwnProperty(key)) {
      const width = breakpoints[key].size / breakpoints.widescreen.size * 100;
      resolutions.forEach((res) => {

        sizes.push({
          name: key,
          suffix: `-${res.name}`,
          width: `${Math.round((width / res.ratio) * 100) / 100}%`,
          quality: breakpoints[key].quality
        });
      });
    }
  }

  return {
    options: {
      engine: 'gm',
      sizes: sizes,
    },
    files: {
      expand: true,
      cwd: `${cwd}/application/assets/images/`,
      src: ['**.{jpg,gif,png}'],
      dest: `${cwd}/application/public/images/dist`,
    }
  };
};
