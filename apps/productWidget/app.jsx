/*  Spylight.bootstrap method queries container nodes, for each
    node found, a callback will pass a data object.
    A new react app with it's own store gets created.
*/
import Spylight from 'helpers/spylightObject';
import Widget from 'helpers/appCreator';

try {
  Spylight.bootstrap((props) => {
    const widgetApp = new Widget(props);
    widgetApp.render();
  });
} catch (error) {
  throw new Error(error);
}
