// @flow
import axios from 'axios'

function AjaxException(message) {
  this.name = 'AjaxException'
  this.message = message
}

const mockQuestions = [
  {
    "category": "Science & Nature",
    "type": "boolean",
    "difficulty": "hard",
    "question": "MOCKED: You can calculate Induced Voltage using: &epsilon; =-N * (d&Phi;B)/(d)",
    "correct_answer": "False",
    "incorrect_answers": [
      "True"
    ]
  },
  {
    "category": "General Knowledge",
    "type": "boolean",
    "difficulty": "hard",
    "question": "This is the correct spelling of &quot;Supercalifragilisticexpialidocious&quot;.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Science: Mathematics",
    "type": "boolean",
    "difficulty": "hard",
    "question": "If you could fold a piece of paper in half 50 times, its&#039; thickness will be 3/4th the distance from the Earth to the Sun.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Mythology",
    "type": "boolean",
    "difficulty": "hard",
    "question": "Rannamaari was a sea demon that haunted the people of the Maldives and had to be appeased monthly with the sacrifice of a virgin girl.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "boolean",
    "difficulty": "hard",
    "question": "Druid is a mage class in &quot;Log Horizon&quot;.",
    "correct_answer": "False",
    "incorrect_answers": [
      "True"
    ]
  },
  {
    "category": "Entertainment: Board Games",
    "type": "boolean",
    "difficulty": "hard",
    "question": "The board game Go has more possible legal positions than the number of atoms in the visible universe.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Science & Nature",
    "type": "boolean",
    "difficulty": "hard",
    "question": "The value of one Calorie is different than the value of one calorie.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Science: Mathematics",
    "type": "boolean",
    "difficulty": "hard",
    "question": "L&#039;H&ocirc;pital was the mathematician who created the homonymous rule that uses derivatives to evaluate limits with indeterminations.",
    "correct_answer": "False",
    "incorrect_answers": [
      "True"
    ]
  },
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "boolean",
    "difficulty": "hard",
    "question": "In the &quot;To Love-Ru&quot; series, Peke is considered a female robot.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Entertainment: Music",
    "type": "boolean",
    "difficulty": "hard",
    "question": "The song Scatman&#039;s World was released after Scatman (Ski-Ba-Bop-Ba-Dop-Bop).",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  }
]

export function fetchQuestions(artificialDelay = 0, artificialErrorRate = 0, useMockQuestions = false) {
  console.error('[api/fetchQuestions called]', artificialDelay, artificialErrorRate)
  let url = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'

  let promise
  if (useMockQuestions) {
    promise = new Promise((resolve) => {
      resolve({data: {results: mockQuestions}})
    })
  } else {
    promise = axios.get(url)
  }
  return promise
    .then(response => {
      if (artificialDelay) {
        console.warn('[artificialDelay in api/fetchQuestions]', artificialDelay)
      }
      const fn = resolve => setTimeout(() => resolve(response), artificialDelay/100*10000)
      return new Promise(fn)
    })
    .then(response => {
      if (Math.random() <= artificialErrorRate/100) {
        console.warn('[artificial error in api/fetchQuestions]')
        throw new AjaxException('Forced fetchQuestions error (development test)')
      }
    
      console.warn('[api/fetchQuestions final resolve]')
      let questions = response.data.results
      if (questions && questions.length) {
        return new Promise(resolve => resolve(questions))
      } else {
        throw new AjaxException('Trivia server responded successfully, but with unexpected results.')
      }
    })

}
