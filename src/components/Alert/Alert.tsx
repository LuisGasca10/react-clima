import{ PropsWithChildren } from 'react';
import styles from './Alert.module.css';
interface Props extends PropsWithChildren{

}
export const Alert = ({children}:Props) => {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
