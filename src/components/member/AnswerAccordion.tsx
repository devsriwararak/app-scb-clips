import { useState } from 'react'

const AnswerAccordion = ({ answerResults }: { answerResults: string[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-1  bg-gray-700 text-white rounded hover:bg-gray-500 text-base"
      >
        {isOpen ? 'ซ่อนคำตอบทั้งหมด ▲' : 'แสดงคำตอบทั้งหมด ▼'}
      </button>

      {isOpen && (
        <div className="space-y-2 p-4 bg-gray-100 rounded text-sm">
          {answerResults.map((msg, index) => (
            <div key={index} className="border-b pb-1">
               {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AnswerAccordion
