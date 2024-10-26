import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEth } from "../../contexts/EthContext";
import styles from './NavBar.module.css';

function NavBar() {
    const { state } = useEth();
    return (
        <div className={styles.navbar}>
            <div className={styles['links-container']}>
                <Link to="/" className={styles.link}>
                    <Typography>My Relics</Typography>
                </Link>
                <Link to="/auction" className={styles.link}>
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
