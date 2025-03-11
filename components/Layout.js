import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';

// app page layout, main navbar at the top, then page content
// organized as components
export default function Layout({ children }) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {children}
            </Container>
            <br />
        </>
    );
};
