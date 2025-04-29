import { H1, H2, H3, H4, H5, H6, P } from '@/components/ui/Typography/Typography'
import { Ul, Ol, UlItem, OlItem } from '@/components/ui/List/List'
import { StyledLink } from '@/components/ui/StyledLink/StyledLink'
import { StyledLinkButton } from '@/components/ui/StyledLinkButton/StyledLinkButton'
import PageHeading from '@/components/PageHeading/PageHeading'

export default function Home() {
  return (
    <>
      <H1>H1 Heading</H1>
      <H2>H2 Heading</H2>
      <H3>H3 Heading</H3>
      <H4>H4 Heading</H4>
      <H5>H5 Heading</H5>
      <H6>H6 Heading</H6>
      <P>Paragraph</P>
      <Ul>
        <UlItem>Parallax Sections</UlItem>
        <UlItem>Retina Homepage</UlItem>
        <UlItem>Shortcode Central</UlItem>
        <UlItem>Ultimate Font Collection</UlItem>
        <UlItem>Theme</UlItem>
      </Ul>
      <Ol>
        <OlItem>Parallax Sections</OlItem>
        <OlItem>Retina Homepage</OlItem>
        <OlItem>Shortcode Central</OlItem>
        <OlItem>Ultimate Font Collection</OlItem>
        <OlItem>Theme</OlItem>
      </Ol>
      <div>
        <StyledLink href='#'>Styled Link</StyledLink>
      </div>
      <div className='p-2 bg-black'>
        <StyledLinkButton variant='outline' href='#'>
          Styled Link
        </StyledLinkButton>
      </div>
      <div className='p-2 bg-black'>
        <StyledLinkButton variant='normal' href='#'>
          Styled Link
        </StyledLinkButton>
      </div>
      <PageHeading title='Page Heading' />
    </>
  )
}
