import type { CSSProperties } from 'react';
import { Colors } from '../ThemeProvider';
import { useContext, useState, useEffect } from 'react';

export default function PopUp({ editing, handleEdit }: any) {
  const colors = useContext(Colors);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Populate fields when editing starts
  useEffect(() => {
    if (editing?.isEditing && editing?.data) {
      setTitle(editing.data.title || '');
      setDescription(editing.data.description || '');
    }
  }, [editing]);

  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'rgba(0,0,0,0.4)',
      display: editing?.isEditing ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      zIndex: 9999,
      direction: 'rtl',
    },
    popup: {
      background: colors.white,
      borderRadius: 16,
      width: window.innerWidth * 0.6,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      zIndex: 99999999999999,
    },
    input: {
      padding: 8,
      borderRadius: 8,
      border: `1px solid ${colors.gray || '#ccc'}`,
      fontSize: 16,
      width: '100%',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
    },
    button: {
      padding: '8px 16px',
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
      fontSize: 16,
    },
    cancelButton: {
      background: colors.error,
      color: colors.white,
    },
    completeButton: {
      background: colors.primary || '#007bff',
      color: colors.white,
    },
  };

  const handleCancel = () => {
    handleEdit(false);
  };

  const handleComplete = () => {
    const newtodo = { ...editing.data, title, description };
    handleEdit({ isEdited: true, data: newtodo });
  };

  return (
    <div style={styles.container}>
      <div style={styles.popup}>
        <input
          type="text"
          placeholder="العنوان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: 80, resize: 'none' }}
        />
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={handleCancel}
          >
            إلغاء
          </button>
          <button
            style={{ ...styles.button, ...styles.completeButton }}
            onClick={handleComplete}
          >
            إتمام
          </button>
        </div>
      </div>
    </div>
  );
}
