import { useContext, useState } from 'react'
import type { CSSProperties } from 'react'

// Contexts
import { Colors } from './ThemeProvider';

// Custom Components
import ToDoCard from './Components/ToDoCard'
import PopUp from './Components/PopUp';

// MUI
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';

export default function App() {
  const colors = useContext(Colors);
  const [currentSection, setCurrentSection] = useState('current')
  const [addValue, setAddValue] = useState('')
  const [editing , setEditing] = useState({data: {} , isEditing: false})
  const InitialAlert: any = {
    isShown: false,
    type: 'success',
    message: 'edited successfully'
  }
  const [alert, setAlert] = useState(InitialAlert)
  const [ToDoList, setToDoList] = useState([
    {
      id: 1,
      title: 'مراجعة الأصول الثلاثة',
      description: 'من الصبح إلى الظهر',
      status: 'current'
    },
    {
      id: 2,
      title: 'مراجعة نواقض الإسلام',
      description: 'من الصبح إلى الظهر',
      status: 'current'
    },
    {
      id: 3,
      title: 'مراجعة القواعد الأربعة',
      description: 'من الصبح إلى الظهر',
      status: 'done'
    },
  ])

  const handleSectionChoose = (section: string) => {
    setCurrentSection(section)
  }

  const styles: { [key: string]: CSSProperties } = {
    body: {
      width: '100%',
      height: '100vh',
      backgroundColor: colors.primary,
      paddingTop: '10vh'
    },
    container: {
      background: colors.white,
      borderRadius: 16,
      boxShadow: "0 0 14px 2px rgba(200, 202, 255, 0.4)",
      border: '1px solid ' + colors.divider,
      minHeight: '20vh',
      direction: 'rtl'
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 16,
      paddingBottom: 16
    },
    headingContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      direction: 'ltr',
      gap: 12
    },
    title: {
      fontSize: 42
    },
    separator: {
      backgroundColor: colors.divider,
      marginBottom: 8,
    },
    addToDo: {
      display: 'flex',
      justifyContent: 'space-between',
      direction: 'rtl',
      gap: 12,
      marginTop: 12
    },
    alert: {
      width: '40%',
      position: 'fixed',
      bottom: 32,
      left: 16,
      zIndex: 99999
    }
  }

  const getButtonStyles = (section: string) => ({
    bgcolor: currentSection === section ? colors.primary : 'transparent',
    color: currentSection === section ? colors.white : 'black',
    borderColor: colors.primary,
    "&:hover": {
      bgcolor: currentSection === section ? colors.primary : 'rgba(0,0,0,0.04)'
    }
  });

  const handleAddToDo = () => {
    const nextId = ToDoList[ToDoList.length - 1].id + 1
    if (addValue == '') {handleShowAlert({type: 'warning' , message: 'لا تستطيع إضافة مهمة فارغة'}); return}
    const newToDo = {
      id: nextId,
      title: addValue,
      description: 'لا توجد معلومات عن المهمة',
      status: 'current'
    }
    setToDoList([...ToDoList , newToDo])
    setAddValue('')
  }
  const handleDone = (id:number) => {
    setToDoList(list => 
      list.map((todo:any) => 
        todo.id === id? { ...todo, status: "done" } : todo
      )
    )
    let aalert = {
      message: 'لقد تم الإضافة إلى قائمة الإنجازات بنجاح',
      type: 'success'
    }
    handleShowAlert(aalert)
  }
  
  const handleEdit = (data: any) => {
    console.log(data)
    if (!data.isEdited){
      setEditing({data: {} , isEditing: false})
      return
    }
    if (data.data.title == ''){
      handleShowAlert({
        type: 'error',
        message: 'لا يمكن وضع عنوان فارغ'
      })
      return
    }
    setEditing({data: {} , isEditing: false})
    setToDoList(list => 
      list.map((todo:any) => 
        todo.id === data.data.id? data.data : todo
  ))
    handleShowAlert({
        type: 'success',
        message: "تم التعديل بنجاح"
      })

  }
  const handleDelete = (id:number) => {
    setToDoList([...ToDoList].filter(todo => todo.id != id))
    let aalert = {
      message: 'لقد تم المسح بنجاح',
      type: 'success'
    }
    handleShowAlert(aalert)
  }
  
  const handleUndo = (id:number) => {
     setToDoList(list => 
      list.map((todo:any) => 
        todo.id === id? { ...todo, status: "current" } : todo
      )
    )
    let aalert = {
      message: 'لقد تم الإرجاع بنجاح',
      type: 'success'
    }
    handleShowAlert(aalert)
  }

  const handleShowAlert = (data: any) => {
    let emptyAlert = {
      message: '',
      type: '',
      isShown: false
    }
    setAlert({...data , isShown: true})
    setTimeout(() => {
      setAlert(emptyAlert)
    }, 3000);
  }

  const handleOpenPopUp = (data:any) => {
    setEditing({data: data , isEditing: true})
  }

  const loadList = () => {
    return ToDoList.filter((todo) => currentSection == 'all' || currentSection == todo.status).map((todo) => <ToDoCard key={todo.id} data={todo} handleDone={handleDone} handleEdit={handleOpenPopUp} handleDelete={handleDelete} handleUndo={handleUndo}/>)
  }

  return (
    <div style={styles.body}>
      <Container maxWidth='sm' style={styles.container}>
        <Stack spacing={1} style={styles.wrapper}>

          <div style={styles.headingContainer}>
            <h1 style={styles.title}>قائمة المهام</h1>

            <ButtonGroup variant="outlined" aria-label="section selector">
              <Button
                onClick={() => handleSectionChoose('current')}
                sx={getButtonStyles('current')}
              >
                قيد الإنجاز
              </Button>

              <Button
                onClick={() => handleSectionChoose('done')}
                sx={getButtonStyles('done')}
              >
                تم الإنجاز
              </Button>

              <Button
                onClick={() => handleSectionChoose('all')}
                sx={getButtonStyles('all')}
              >
                الكل
              </Button>
            </ButtonGroup>
          </div>

          <hr style={styles.separator} />

          {loadList()}

          <hr style={styles.separator} />

          <h3>أدخل إسم المهمة</h3>
          <div style={styles.addToDo}>
            <TextField
              fullWidth
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
            />
            <Button
              variant='contained'
              style={{ width: 64, background: colors.secondary }}
              onClick={handleAddToDo}
            >
              إضافة
            </Button>
          </div>

        </Stack>
      </Container>
      <Alert variant='filled' severity={alert.type} style={ alert.isShown? styles.alert : {display: 'none'}}>{alert.message}</Alert>
      <PopUp editing={editing} handleEdit={handleEdit}/>
    </div>
  );
}
