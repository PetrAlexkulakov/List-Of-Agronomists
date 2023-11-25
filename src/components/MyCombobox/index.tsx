import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { participants } from '../../share/participants'
import styles from './styles.module.scss'

export function MyCombobox() {
  const [selectedPerson, setSelectedPerson] = useState('')
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? participants
      : participants.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <div className='flex w-full items-center'>
            <Combobox.Input placeholder='Введите агронома/отделение' className={styles.searchInput} onChange={(event) => setQuery(event.target.value)} />
            <Combobox.Button className={styles.searchButtonContainer + " flex items-center"}>
                <div className={styles.searchButton} aria-hidden="true" />
            </Combobox.Button>
        </div>
        <Combobox.Options>
            {filteredPeople.map((person) => (
            <Combobox.Option key={person.name} value={person}>
                {person.name}
            </Combobox.Option>
            ))}
        </Combobox.Options>
    </Combobox>
  )
}