import { v4 as uuidv4 } from 'uuid';

export interface IParticipant {
    id: string;
    name: string;
    phone: string;
    role: string;
    activeUntil: string;
    isTemporary: boolean;
    department: string;
    comment?: string;
}

export const participants: IParticipant[] = [
    {
        id: uuidv4(),
        name: 'Username345',
        phone: '+9 (999) 999 99 99',
        role: 'Руководитель',
        activeUntil: 'Постоянный',
        department: 'Отделение намбер уан',
        isTemporary: false
    },
    {
        id: uuidv4(),
        name: 'AnotherDepartmentPerson',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Новое отделение',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username34',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username3',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username1',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username2',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username4',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username5',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
    {
        id: uuidv4(),
        name: 'Username6',
        phone: '+9 (999) 999 99 99',
        role: 'Агроном',
        activeUntil: '24.02.2021',
        department: 'Отделение намбер уан',
        isTemporary: true,
    },
]