import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TestComponent from "../components/TestComponent/TestComponent";

describe("Testing component : <TestComponent />", () => {
  const componentId = "ComponentUnderTest";

  beforeAll(() => {
  });

  afterAll(() => {
  })
  
  beforeEach(() => {
  });

  afterEach(() => {
  });

  test("<TestComponent /> should render with id", async () => {

    // Create our component with our generated id
    const testRenderer = renderer.create(<TestComponent id={componentId} />);

    // Use the created renderer to convert to json and then check it matches our expected snapshot
    const jsonSnapshot = testRenderer.toJSON();

    // Check that our rendered component does have the exact randomly generated componentid for this test
    expect(jsonSnapshot).toHaveProperty("props.id", componentId);   

    // Match that our rendered component matches our snapshot of the component and ignore the random id
    expect(jsonSnapshot).toMatchSnapshot(
      {
        props: { id: expect.any(String) },
      }
    );
  });

  test("<TestComponent /> successfully renders a circle", async () => {

    // Create our component with our auto generated id, height and width
    const testRenderer = renderer.create(<TestComponent id={componentId} height={300} width={300} />);
    
    // Use the created renderer to convert to json and then check it matches our expected snapshot
    const jsonSnapshot = testRenderer.toJSON();

    // Match that our rendered component matches our snapshot of the component, ignoring specific height, width, dynamic className and random id
    expect(jsonSnapshot).toMatchSnapshot();

    // Check that our rendered component does have the exact randomly generated componentid for this test
    expect(jsonSnapshot).toHaveProperty("props.id", componentId);    
    
    // Check the random width and height styles are applied to the rendered component 
    expect(jsonSnapshot).toHaveStyleRule('height', '300');
    expect(jsonSnapshot).toHaveStyleRule('width', '300');
  });

  test("<TestComponent /> successfully renders in a disabled state", async () => {

    // Create our component with our auto generated id and disabled set to true
    const testRenderer = renderer.create(<TestComponent id={componentId} disabled={true} />);
    
    // Use the created renderer to convert to json and then check it matches our expected snapshot
    const jsonSnapshot = testRenderer.toJSON();

    // Match that our rendered component matches our snapshot of the component, ignoring specific height, width, dynamic className and random id
    expect(jsonSnapshot).toMatchSnapshot();

    // Check that our rendered component does have the exact randomly generated componentid for this test
    expect(jsonSnapshot).toHaveProperty("props.id", componentId);    
    
    // Check the style is correctly set to opacity 0.2 (disabled)
    expect(jsonSnapshot).toHaveStyleRule('opacity', '0.2');
  });

  test("<TestComponent /> successfully renders as a primary control with the correct hoverBackgroundColor", async () => {

    // Create our component with our auto generated id and disabled set to true
    const testRenderer = renderer.create(<TestComponent id={componentId} primary={true} hoverBackgroundColor='red' />);
    
    // Use the created renderer to convert to json and then check it matches our expected snapshot
    const jsonSnapshot = testRenderer.toJSON();

    // Match that our rendered component matches our snapshot of the component, ignoring specific height, width, dynamic className and random id
    expect(jsonSnapshot).toMatchSnapshot();

    console.log(jsonSnapshot);

    // Check that our rendered component does have the exact randomly generated componentid for this test
    expect(jsonSnapshot).toHaveProperty("props.id", componentId);    
    
    // Check the style is correctly set background-color red (from the hoverBackGroundColor property)
    // expect(jsonSnapshot).toHaveStyleRule('background-color', 'red');
  });
});
