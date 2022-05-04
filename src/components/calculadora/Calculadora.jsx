import React, {useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Calculadora = () => {
    const MySwal = withReactContent(Swal)
    const [ans, setAns] = useState(0)
    const [buffer, setBuffer] = useState("")
    const [listBuffer, setListBuffer] = useState([])
    const [listBufferOperators, setListBufferOperators] = useState([])
    const [operacion, setOperacion] = useState(null)
    const [onWait, setOnWait] = useState(false)
    const [allowNegative, setAllowNegative] = useState(false)
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+/-"]
    const operaciones = ["*", "+", "-","/","%", "="]
    const pressButton = ($event) =>{
        if(numbers.includes($event.target.id)){
            if(buffer==="0" || onWait){ 
                if($event.target.id!=="+/-")setBuffer($event.target.id)
                else {
                    setAllowNegative(true)
                    setBuffer("-")
                }
                setOnWait(false)
            }
            else {
                if(buffer.length<9){ 
                    if($event.target.id==="+/-"){
                        if(!allowNegative){
                            setAllowNegative(true)
                            setBuffer("-"+buffer)
                        }
                    }
                    else{
                        setBuffer(buffer+$event.target.id)
                    }
                }else{
                    console.log("limite de caracteres alcanzado")
                    MySwal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Límite de caracteres alcanzado! (9)',
                        footer: 'Intente borrando caracteres'
                      })
                }
            }

        }else{
            if($event.target.id==="AC") {
                setBuffer("")
                setListBuffer([])
                setListBufferOperators([])
                setAns(0)
                setAllowNegative(false)
            }
            else if($event.target.id==="DEL" ) setBuffer(buffer.slice(0, -1))
            else if(operaciones.includes($event.target.id)){
                try {
                    setOperacion($event.target.id)
                    setOnWait(true)
                    if(buffer){
                        listBuffer.push(Number.parseFloat(buffer))
                        listBufferOperators.push($event.target.id)
                    }
                    
                    let result
                    listBuffer.forEach((numInBuff, index)=>{
                        if(index===0) result = numInBuff
                        else{
                            switch(listBufferOperators[index-1]){
                                case "+":
                                    result = Number.parseFloat(result) + numInBuff
                                    break;
                                case "-":
                                    result = Number.parseFloat(result) - numInBuff
                                    break;
                                case "*":
                                    result = Number.parseFloat(result) * numInBuff
                                    break;
                                case "/":
                                    result = Number.parseFloat(result) / numInBuff
                                    break;
                                case "%":
                                    result = Number.parseFloat(result) % numInBuff
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                    let error =  (allowNegative)?(result>999999999):((result>999999999)||(result<0))
                    if(!error){
                        let resList = (result.toString().split("."))
                        let tamanoResultado = result.toString().length
                        if(tamanoResultado>9){
                            if(resList[1] && resList[0].length<9){
                                if(resList[0].length===8)result= resList[0]
                                else{
                                    let decimaleEspacio = 8-resList[0].length
                                    result = `${resList[0]}.${resList[1].slice(0, decimaleEspacio)}`
                                }
                            }else{
                                result = resList[0].slice(0, 9)
                            }
                        }                            
                    }
              
                    setAns(error?"ERROR":result)
                    if($event.target.id==="="){
                        setListBuffer([])
                        setListBufferOperators([])
                        setBuffer("")
                        setAllowNegative(false)
                    }

                    

                  } catch (error) {
                    setAns("Error en la operacion") 
                    setListBuffer([])
                    setListBufferOperators([])
                    setBuffer("")
                    setAllowNegative(false)
                    console.error(error);

                  }
                
            }   
        }
    }
    return (
        <div id="calcu-main-wrapper">
            <div className='calc-header'>
                <div className='calc-header-line1'>
                    <p className='button_font'>CASIO</p>
                    <p className='button_font'>fx-82MS</p>
                </div>
                <div className='calc-header-line2'>
                    <p className='font-red'>S - V.P.A.M.</p>
                </div>
            </div>
            <div className='calcu-display'>
                <div className='display-buffer' >
                    <p id="display-buffer-text" className='display-overflow-hidden' >{buffer}</p>
                </div>
                <div className='display-content'>
                    <p id="display-result-text" className='display-overflow-hidden' >{ans}</p>
                </div>
            </div>
            <div className='calcu-body display-overflow-hidden'>
                <div className='buttons-wrapper'>
                    <button onClick={pressButton}className="button-item-gray" id="7">7</button>{/* 7 */}
                    <button onClick={pressButton}className="button-item-gray" id="8">8</button>{/* 8 */}
                    <button onClick={pressButton}className="button-item-gray"id="9">9</button>{/* 9 */}
                    <button onClick={pressButton}className="button-item-red"id="DEL">DEL</button>{/* del */}
                    <button onClick={pressButton}className="button-item-red"id="AC">AC</button>{/* AC */}
                    <button onClick={pressButton}className="button-item-gray"id="4">4</button>{/* 4 */}
                    <button onClick={pressButton}className="button-item-gray"id="5">5</button>{/* 5 */}
                    <button onClick={pressButton}className="button-item-gray"id="6">6</button>{/* 6 */}
                    <button onClick={pressButton}className="button-item-gray"id="*">*</button>{/* X */}
                    <button onClick={pressButton}className="button-item-gray"id="/">/</button>{/* / */}
                    <button onClick={pressButton}className="button-item-gray"id="1">1</button>{/* 1 */}
                    <button onClick={pressButton}className="button-item-gray"id="2">2</button>{/* 2 */}
                    <button onClick={pressButton}className="button-item-gray"id="3">3</button>{/* 3 */}
                    <button onClick={pressButton}className="button-item-gray"id="+">+</button>{/* + */}
                    <button onClick={pressButton}className="button-item-gray"id="-">-</button>{/* - */}
                    <button onClick={pressButton}className="button-item-gray"id="0">0</button>{/* 0 */}
                    <button onClick={pressButton}className="button-item-gray"id=".">.</button>{/* . */}
                    <button onClick={pressButton}className="button-item-gray"id="+/-">+/- </button>{/* EXP */}
                    <button onClick={pressButton}className="button-item-gray"id="%">%</button>{/* ANS */}
                    <button onClick={pressButton}className="button-item-gray"id="=">=</button>{/* - */}
                </div>
            </div>

        </div>
    )
}

export default Calculadora