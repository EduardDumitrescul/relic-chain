import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useEth } from "../../contexts/EthContext";
import styles from './NavBar.module.css';

function NavBar() {
    const theme = useTheme();
    const { state } = useEth();

    document.documentElement.style.setProperty('--primary-main', theme.palette.primary.main);
    document.documentElement.style.setProperty('--primary-contrastText', theme.palette.primary.contrastText);
    document.documentElement.style.setProperty('--spacing-8', theme.spacing(8));
    document.documentElement.style.setProperty('--spacing-2', theme.spacing(2));
    document.documentElement.style.setProperty('--spacing-4', theme.spacing(4));

    return (
        <div className={styles.navbar}>
            <div className={styles['links-container']}>
                <Link to="/" className={styles.link}>
                    <Typography>My Relics</Typography>
                </Link>
                <Link to="/" className={styles.link}>
                    <Typography>Auctions</Typography>
                </Link>
            </div>

            <div className={styles['profile-info-container']}>
                <Typography variant="body1" className={styles['no-margin']}>
                    Account: {state.accounts[0]}
                </Typography>
                <Typography variant="body1" className={styles['no-margin']}>
                    Balance: {state.web3.utils.fromWei(state.balance, 'ether')} ETH
                </Typography>
            </div>
        </div>
    );
}

export default NavBar;
