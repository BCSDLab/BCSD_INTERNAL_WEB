import { SideBar,TopBar,Content,Container, Logo, SideBarButton } from "./style";

export default function DefaultLayout() {
  return (
    <>
        <Container>
          <SideBar>
            <Logo src="/src/assets/image/BCSD_logo-01.png" alt="logo" />
            <SideBarButton>회원정보</SideBarButton>
          </SideBar>
          <Content>
            <TopBar/>
          </Content>
        </Container>
    </>
  )
}