import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export const pageSizeForIndexTable = 5

export function confirmDelete(callback: () => void) {
    confirmAlert({
      title: 'ยืนยันการลบ',
      message: 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?',
      buttons: [
        {
          label: 'ใช่',
          onClick: callback
        },
        {
          label: 'ไม่',
          onClick: () => {} // ไม่ทำอะไร
        }
      ]
    });
  }


// Format เลขบัตรปรนะชาชน
  export const formatIdCard =(id: string) => {
    const mainPart = id.slice(0, -3)
    return `${id[0]}-${id.slice(1,5)}-${id.slice(5,10)}-${mainPart.slice(10,12)}-XX-X`
  }