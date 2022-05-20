import React from 'react'
import ReactDOM from 'react-dom'
import Calculadora from './../Calculadora'//import component to test
import { render, cleanup, fireEvent } from '@testing-library/react'//for regular testinsn
import renderer from 'react-test-renderer' //for snapshots

afterEach(cleanup)//clean up de DOM after every test
/**
 * 
 * TEST 1
 * @jest-environment jsdom
 * 
 */
test("write in display num", ()=>{
    render(<Calculadora/>)
    var top_buffer = document.getElementById("display-buffer-text")
    fireEvent.click(document.getElementById('9'))
    expect(top_buffer.innerHTML).toEqual('9')
    fireEvent.click(document.getElementById('8'))
    expect(top_buffer.innerHTML).toEqual('98')
})
/**
 * TEST 2
 * @jest-environment jsdom
 */
test ("9 characters limit", ()=>{
    render(<Calculadora/>)
    var top_buffer = document.getElementById("display-buffer-text")
    const array = ['1','0', '2', '3', '4', '5', '6', '7', '8', '9']//Hay 10 elementos, pero solo 9 deben escribirse en el buffer
    array.forEach(id =>fireEvent.click(document.getElementById(id)))
    expect(top_buffer.innerHTML).toEqual('102345678')
    expect(top_buffer.innerHTML.length).toEqual(9)
})
 /**
 * TEST 3
 * @jest-environment jsdom
 */
test ("operation +", ()=>{// 
    render(<Calculadora/>)
    const bottom_buffer = document.getElementById("display-result-text")
    const sumando_1 = '987'
    const sumando_2 = '222'
    for (const id of sumando_1) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('+'))
    for (const id of sumando_2) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('='))
    expect(bottom_buffer.innerHTML).toEqual((+sumando_1 + +sumando_2).toString())
})
/**
 * TEST 4
 * @jest-environment jsdom
 */ 
test ("convert into negative with buttono +/-", ()=>{
    render(<Calculadora/>)
    const top_buffer = document.getElementById("display-buffer-text")
    const ingreso = '987'
    for (const id of ingreso) fireEvent.click(document.getElementById(id))
    fireEvent.click(document.getElementById('+/-'))
    expect(top_buffer.innerHTML).toEqual("-"+ingreso)   
})
/**
 * TEST 5
 * @jest-environment jsdom
 */ 
test ("del button changes display", ()=>{
    render(<Calculadora/>)
    const top_buffer = document.getElementById("display-buffer-text")
    const ingreso = '123'
    for (const id of ingreso) fireEvent.click(document.getElementById(id))
    expect(top_buffer.innerHTML).toEqual(ingreso)   
    for (let i = ingreso.length; i !== 0; i--) {
        fireEvent.click(document.getElementById("DEL"))
        expect(top_buffer.innerHTML).toEqual(ingreso.slice(0,i-1))   
    }
})
/**
 * TEST 6: 
 * @jest-environment jsdom
 */   
test ("AC button effect on display", ()=>{
    render(<Calculadora/>)
    const top_buffer = document.getElementById("display-buffer-text")
    const bottom_buffer = document.getElementById("display-result-text")

    const multiplicando = '999'
    const multiplicador = '2'
    for (const id of multiplicando) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('*'))
    for (const id of multiplicador) {fireEvent.click(document.getElementById(id))}
    expect(top_buffer.innerHTML).toEqual(multiplicador)   
    expect(bottom_buffer.innerHTML).toEqual(multiplicando)   
    fireEvent.click(document.getElementById('AC'))
    expect(top_buffer.innerHTML).toBeNull   
    expect(bottom_buffer.innerHTML).toBeNull
    
})
/**
 * TEST 7
 * @jest-environment jsdom
 */ 
test ("stack oprations on click operation until =", ()=>{
    render(<Calculadora/>)

    const bottom_buffer = document.getElementById("display-result-text")

    const operando_1 = '12'
    const operando_2 = '7'
    const operando_3 = '10'

    for (const id of operando_1) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('*'))
    for (const id of operando_2) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('+'))
    for (const id of operando_3) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('='))

    expect(bottom_buffer.innerHTML).toEqual((+operando_1 * +operando_2 + +operando_3).toString())

})
/**
 * TEST 8
 * @jest-environment jsdom
 */ 
 test ("friendly responde on division by 0", ()=>{
    render(<Calculadora/>)

    const bottom_buffer = document.getElementById("display-result-text")

    const dividendo = '12'
    const divisor = '0'

    for (const id of dividendo) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('/'))
    for (const id of divisor) {fireEvent.click(document.getElementById(id))}
    fireEvent.click(document.getElementById('='))

    expect(bottom_buffer.innerHTML).toEqual('ERROR')

})