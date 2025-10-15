import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import {  useState } from 'react'

import Checkbox from '../Checkbox'

import passwordGif from '../../assets/gif/password.gif'
import copyIcon from '../../assets/icons/copy.svg'
import refreshIcon from '../../assets/icons/refresh.svg'

import './index.css'

const PasswordGenerator = () => {
  const [message, setMessage] = useState("Copiar")
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [password, setPassword] = useState("Clique para gerar")
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [number, setNumber] = useState(true);
  const [special, setSpecial] = useState(false);
  const onChangePasswordLength = (value: any) => {
    setPasswordLength(value)
  }

  function generatePassword() {
    const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const minusculas = "abcdefghijklmnopqrstuvwxyz"
    const numeros = "0123456789"
    const simbolos = "!@#$%^&*"

    let possible = ""

    if (uppercase) possible += maiusculas
    if (lowercase) possible += minusculas
    if (number) possible += numeros
    if (special) possible += simbolos
    if (!possible) return "Selecione ao menos alguma opção"

    let caracteres = "";
    for (let i = 0; i < passwordLength; i++) {
      const indice = Math.floor(Math.random() * possible.length)
      caracteres += possible[indice]
    }

    setPassword(caracteres);
  }

  function copyPassword()  {
    navigator.clipboard.writeText(password); 
    setMessage("Copiado!");                
    setTimeout(() => setMessage("Copiar"), 2000); 
  }

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className={message}></div>
      <div className="tac">
        <h2 className="title">GERADOR DE SENHA</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={password} />
          <img src={refreshIcon}
            onClick={() => generatePassword()} alt="refresh the password" />
        </div>
        <button onClick={() => copyPassword() } className="copy-btn">
          <img src={copyIcon} alt="copy password" />
          
          {message}
        </button>
      </div>
      <span className="fw-500">Weak</span>
      <div className="slider">
        <div>
          <label id="slider-label">Tamanho da senha: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Maiúscula" checked={uppercase} onChange={() => setUppercase(!uppercase)} name="upper" />
        <Checkbox id="lowercase" label="Minúscula" checked={lowercase} onChange={() => setLowercase(!lowercase)} name="lower" />
        <Checkbox id="numbers" label="Números" checked={number} onChange={() => setNumber(!number)} name="numbers" />
        <Checkbox
          id="special chars"
          label="Caracteres Especiais"
          checked={special}
          onChange={() => setSpecial(!special)}
          name="specialChars"
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
