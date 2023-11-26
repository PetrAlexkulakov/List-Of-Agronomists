import { SetStateAction, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { IParticipant } from '../../share/participants'
import styles from './styles.module.scss'

export function MyCombobox({ filteredPeople, setViewedPeople }: {
    filteredPeople: IParticipant[],
    setViewedPeople: React.Dispatch<SetStateAction<IParticipant[]>>
  }) {
  const [selectedPerson, setSelectedPerson] = useState('')
  const [query, setQuery] = useState('')

  const handleSelectPerson = (value: string) => {
    setSelectedPerson(value);
    setViewedPeople(
        query === ''
          ? filteredPeople
          : filteredPeople.filter((person, index, self) => {
              const matchDepartment = person.department.toLowerCase().includes(query.toLowerCase());
              const matchName = person.name.toLowerCase().includes(query.toLowerCase());

              return matchDepartment || (matchName && self.findIndex((p) => p.name === person.name) === index);
            }));
  }

  return (
    <Combobox value={selectedPerson} onChange={handleSelectPerson}>
      <div className='flex w-full items-center mb-5'>
        <Combobox.Input
          placeholder='Введите агронома/отделение'
          className={styles.searchInput}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button
          className={styles.searchButtonContainer + " flex items-center"}
          onClick={() => handleSelectPerson('')}
        >
          <div className={styles.searchButton} aria-hidden="true" />
        </Combobox.Button>
      </div>
      <Combobox.Options>
        {filteredPeople.map((person, index) => (
        <Combobox.Option key={index} value={person}>
          <div className='w-full flex place-content-around'>
            <div>{person.name}</div>
            <div>{person.department}</div>
          </div>
        </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}