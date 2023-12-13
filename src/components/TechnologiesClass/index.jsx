/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Component } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getTechnologies } from '../../redux/technologySlice.js';
import { connect } from 'react-redux';

class TechnologiesClass extends Component {
  componentDidMount() {
    this.props.getTechnologies();
  }

  render() {
    const { technologiesList } = this.props;

    return (
      <div className={styles.generalContainer}>
        <SideBar />
        <div className={styles.mainContainer}>
          <h1>Technologies List</h1>
          <Table sx={{ minWidth: 650 }} className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#334d6e88' }}>Name</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Development Side</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {technologiesList?.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.development_side}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  technologiesList: state.technologies.list,
});

const mapDispatchToProps = {
  getTechnologies,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologiesClass);
