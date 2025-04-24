import { Container } from '@/components/ui/Container/Container'
import { H1, P } from '@/components/ui/Typography/Typography'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import PageHeading from '@/components/PageHeading/PageHeading'

export default function NotFoundPage() {
  return (
    <>
      <PageHeading title='404 Not Found' />
      <Container>
        <div className='max-w-[770px] mx-auto text-center'>
          <H1 className='text-[22px] xl:text-[36px]'>Упс! Цю сторінку неможливо знайти.</H1>
          <div>
            <P className='my-3'>Схоже, за вказаною адресою нічого не знайдено.</P>

            <div className='flex justify-center items-center gap-4'>
              <StyledLinkButton href='/' className='bg-[#56b0d2] text-white w-[135px]'>
                На головну
              </StyledLinkButton>
              <StyledLinkButton href='/' variant='outline' className='border-[#56b0d2] text-[#56b0d2] w-[135px]'>
                Назад
              </StyledLinkButton>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
