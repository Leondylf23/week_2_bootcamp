import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import classes from "./style.module.scss";

export default function InputSelect({optionDatas, placeholder, value, onChange, Icon}) {
    return(
        <div className={classes.selectContainer}>
            {Icon && <div className={classes.iconField}>
                {Icon}
            </div>}
            <select className={classes.selectNoIcon} value={value} onChange={onChange}>
                {placeholder && <option value={""} key={""}>{placeholder}</option>}
                {Array.isArray(optionDatas) && optionDatas.map(e => <option value={e?.value} key={e?.value}>{e?.name}</option>)}
            </select>
            <div className={classes.arrowField}>
                <ExpandMoreIcon />
            </div>
        </div>
    );
}