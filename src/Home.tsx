import Input from "./components/Input"
import {useState} from 'react'
type CSSProperties = React.CSSProperties;
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const bankIcon = <AccountBalanceIcon style={{color: "blue"}} />

export default function Home() {
  // const [isValid, setIsValid] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber:'' ,
    age:'',
    amount: '',
    isEmployee: false,
  })

  const inputs:any = [
    { label: 'Name', type: 'text', handleChange:  (value: string)=> handleNameChange(value)},
    { label: 'Phone Number', type: 'number', handleChange:  (value: string)=> handlePhoneChange(value)},
    { label: 'Age', type: 'number', handleChange:  (value: string)=> handleAgeChange(value)},
    { label: 'Are you an Employee', type: 'checkbox', handleChange:  (value: boolean)=> handleIsEmployeeChange(value)},
    { label: 'choose amount', type: 'select', handleChange:  (value: string)=> handleAmountChange(value)},
  ]
  const isValid = formData.name.length > 2 && formData.phoneNumber.length >=10 && formData.phoneNumber.length <=12 && formData.age !== ''


  const handleNameChange = (value: string) => {
    const newData = { ...formData, name: value };
    setFormData(newData);
  }

  const handlePhoneChange = (value: string) => {
    const newData = { ...formData, phoneNumber: value };
    setFormData(newData);
  }

  const handleAgeChange = (value: string) => {
    const newData = { ...formData, age: value };
    setFormData(newData);
  }

  const handleIsEmployeeChange = (value: boolean) => {
    setFormData({...formData, isEmployee: value});
  }

  const handleAmountChange = (value: string) => {
    setFormData({...formData, amount: value});
  }

  const handleSubmit = () => {
    if (!isValid) {
      return
    }
    let age = parseInt(formData.age)
    if (age < 18 || age > 99) {
      alert("Age Unvalid");
      return
    } else {
      alert("Form Submitted successfully");
    }
  }

  return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={(e) => {
          e.preventDefault()
        }}>
          <h1>{bankIcon} Loan Form </h1>
          {inputs.map((input:any) => <Input label={input.label} type={input.type} handleChange={input.handleChange}/>)}
          <Button
           variant={isValid? "contained": "outlined"} 
           disabled={!isValid} 
           onClick={handleSubmit}>Submit</Button>
        </form>
      </div>
  )
}

const styles:{[key:string] : CSSProperties} = {
  container: {
    marginTop: 40,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "100vh",
  },
  form : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0, 70, 160, 0.12)",
    minWidth: "50vw",
    minHeight: "50vh",
  },
  submitBtn: {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: 5,
    border: 'none',
    backgroundColor: '#3199c6ff',
    color: '#ffffff',
    cursor: 'pointer',
  }
}
