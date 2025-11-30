export default function Input({label, type, handleChange, value}: any) {
    let isCheckBox = type === 'checkbox';
    let input:any;
    if (type !== 'select') {
        input = () => {
            return (
                <div style={styles.inputContainer}>
                    <label>{label}</label>
                    <input
                    checked={isCheckBox ? value : undefined}
                    value={isCheckBox ? undefined : value}
                    type={type} style={type != 'checkbox'? styles.inputStyle: {aspectRatio: 1, width: 48, }} 
                    onChange={(e) => {
                        let value = isCheckBox ? e.target.checked : e.target.value;
                        handleChange(value)
                    }}/>
                </div>
            )
        }
    } else if (type === 'select') {
        input = () => {
            return (
                <div style={styles.inputContainer}>
                    <label>{label}</label>
                     <select
                        value={value}
                        style={styles.inputStyle}
                        onChange={(e) => handleChange(e.target.value)}
                        >
                        <option value="500$">500$</option>
                        <option value="1000$">1000$</option>
                        <option value="5000$">5000$</option>
                    </select>
                </div>
            )
        }
    }
  return input()
}

const styles:any = {
    inputContainer: { 
        width: "80%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    inputStyle: {
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #848484ff',
        borderRadius: 8,
        fontSize: 16,
        padding: 10,
        width: '100%',
        heigth: '100%',
        outline: 'none',
    }
}
