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