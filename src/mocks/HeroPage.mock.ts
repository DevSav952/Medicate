import { IService } from '@/interfaces/HeroPage.interface'
import { IDepartment } from '@/interfaces/HeroPage.interface'

import physician from '@/assets/icon-img-1.webp'
import treatment from '@/assets/icon-img-2.webp'
import safety from '@/assets/icon-img-3.webp'
import service from '@/assets/icon-img-4.webp'
import pulmanoryOne from '@/assets/icon-img-7.webp'
import pulmanoryTwo from '@/assets/icon-img-8.webp'
import pulmanoryThree from '@/assets/icon-img-9.webp'
import birth from '@/assets/icon-img-10.webp'
import gynaecology from '@/assets/icon-img-11.webp'
import dental from '@/assets/icon-img-12.webp'
import pregnancy from '@/assets/icon-img-14.webp'
import diasbled from '@/assets/icon-img-15.webp'
import nmr from '@/assets/icon-img-16.webp'

export const mockedServicesData: IService[] = [
  {
    icon: physician,
    title: 'Досвідчені лікарі',
    description: "Ваше здоров'я - це ваш найважливіший актив. Довіряти його слід лише найкращим професіоналам."
  },
  {
    icon: treatment,
    title: 'Персоналізоване лікування',
    description: 'Вибір лікування ідеально відповідає вашим цілям лікування ускладнень при ранньому втручанні.'
  },
  {
    icon: safety,
    title: 'Якість та безпека',
    description:
      'Усі члени команди медичного центру пройшли ретельну підготовку, щоб надати допомогу в будь-якій ситуації.'
  },
  {
    icon: service,
    title: 'Невідкладна допомога',
    description: 'Ваш план лікування розрахований на постійний прогрес, з оперативним виконанням кожного етапу.'
  }
]

export const mockedDepartments: IDepartment[] = [
  {
    icon: pulmanoryOne,
    title: 'Пульманологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: pulmanoryTwo,
    title: 'Пульманологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: pulmanoryThree,
    title: 'Пульманологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: birth,
    title: 'Пологи',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: gynaecology,
    title: 'Гінекологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: dental,
    title: 'Стоматологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: pregnancy,
    title: 'Вагітність',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: diasbled,
    title: 'Інклюзивність',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: nmr,
    title: 'Томографія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  }
]

export const mockedDepartmentsOne: IDepartment[] = [
  {
    icon: pulmanoryOne,
    title: 'Пульманологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: pulmanoryTwo,
    title: 'Пульманологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: pulmanoryThree,
    title: 'Пульманологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: birth,
    title: 'Пологи',
    description: 'Лікування ідеально відповідає вашим цілям.'
  }
]

export const mockedDepartmentsTwo: IDepartment[] = [
  {
    icon: gynaecology,
    title: 'Гінекологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: dental,
    title: 'Стоматологія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: pregnancy,
    title: 'Вагітність',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: diasbled,
    title: 'Інклюзивність',
    description: 'Лікування ідеально відповідає вашим цілям.'
  },
  {
    icon: nmr,
    title: 'Томографія',
    description: 'Лікування ідеально відповідає вашим цілям.'
  }
]
