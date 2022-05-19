import React from 'react'
import ReactDOM from 'react-dom'
import Calculadora from './../Calculadora'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
afterEach(cleanup)
/**
 * @jest-environment jsdom
 */
test ("renders without crashing", ()=>{
    const tree = renderer.create(<Calculadora/>).toJSON();
    expect(tree).toMatchSnapshot()
})