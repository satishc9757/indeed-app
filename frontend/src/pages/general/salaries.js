import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Avatar from '@mui/material/Avatar'
import NavBar from '../../components/user/NavBar'
import FindSalaries from '../../components/general/FindSalaries'

const styles = (theme) => ({
    ...theme.spread,
    title : {
        marginLeft : '50px',
        marginTop : '25px',
        fontSize : '38px',
        fontWeight : 700,
    },
    salaryCard : {
        marginLeft : '50px',
        marginTop : '25px',
        backgroundColor : 'white',
        borderRadius : '10px',
        borderTop : '10px solid #085FF7',
        border: '1px solid #ECECEC',
        height : '148px'
    },
    companyCard : {
        marginLeft : '50px',
        marginTop : '25px',
        marginBottom : '70px',
        backgroundColor : 'white',
        borderRadius : '10px',
        border: '1px solid #ECECEC',
    },
    part1 : {
        padding : '30px'
    },
    part2 : {
        borderLeft : '1px solid #ECECEC',
        padding : '30px'
    },
    salary : {
        color : '#595959',
        fontSize : '45px',
        fontWeight : 700
    },
    base : {
        color : '#6F6F6F',
        fontSize : '18px',
        fontWeight : 600
    },
    how : {
        marginLeft : '50px'
    },
    topComp : {
        height : '80px',
        paddingTop : '10px',
        borderBottom : '1px solid #ECECEC',
    },
    name : {
        fontSize : '20px',
        fontWeight : 700
    },
    sal : {
        fontSize : '22px',
        fontWeight : 700,
        paddingLeft : '30px'
    },
    str : {
        fontSize : '15px',
        marginBottom : '20px'
    },
    yr : {
        color : '#9C6F9C',
        paddingLeft : '30px',
        fontSize : '15px',
    },
    logo : {
        paddingLeft : '30px',
    }
})

class salaries extends Component {
    displayTopFiveHighPayCompanies(){
        const {topFiveHighPayCompanies} = this.props.user.searchSalariesTitleLoc
        const {classes} = this.props

        return topFiveHighPayCompanies.map((company) => (
            <Grid container item xs={12} className ={classes.topComp}>
                <Grid container item xs={1} className ={classes.logo}>
                    <Avatar variant="square">
                        {company.job_company_name.split('')[0]}
                    </Avatar>
                </Grid>
                <Grid container item xs={9} className ={classes.name}>
                    {company.job_company_name}
                </Grid>
                <Grid container item xs={2} className ={classes.sal}>
                    ${company.job_compensation * 8 * 216}
                </Grid>

                <Grid container item xs={1}>
                </Grid>
                <Grid container item xs={9} className ={classes.str}>
                    4
                </Grid>
                <Grid container item xs={2} className ={classes.yr}>
                    per year
                </Grid>
            </Grid>
        ))
    }

    render() {
        const {classes} = this.props
        const {searchSalariesTitleLoc} = this.props.user
        return (    
            <Grid container>
                <Grid direction="row" container item>
                    <NavBar/>
                </Grid>
                <Grid direction="row" container item>
                    <FindSalaries/>
                </Grid>

                {
                    Object.keys(searchSalariesTitleLoc).length !== 0 &&
                    <>
                    <Grid direction="row" container item>

                        <Grid direction="row" container item xs={10} className={classes.title}>
                            {searchSalariesTitleLoc.job_title} salary in {searchSalariesTitleLoc.job_location}
                        </Grid>
                        <Grid direction="row" container item xs={10} className={classes.how}> 
                            How much does a {searchSalariesTitleLoc.job_title} make in {searchSalariesTitleLoc.job_location}?
                        </Grid>
                        <Grid direction="row" container item className={classes.salaryCard} xs={10}>
                            <Grid direction="row" container item xs={6}  className={classes.part1}>
                                <Grid direction="row" container item className={classes.base}>
                                    Average base salary per year
                                </Grid>
                                <Grid direction="row" container item   className={classes.salary}>
                                    ${searchSalariesTitleLoc.avgSalaryPerYear}
                                </Grid>
                            </Grid>
                            <Grid direction="row" container item xs={6} className={classes.part2}>
                                <Grid direction="row" container item className={classes.base}>
                                    Average base salary per hour
                                </Grid>
                                <Grid direction="row" container item className={classes.salary}>
                                    ${searchSalariesTitleLoc.avgSalary} 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid direction="row" container item>

                        <Grid direction="row" container item xs={10} className={classes.title}>
                            Top companies for {searchSalariesTitleLoc.job_title} in {searchSalariesTitleLoc.job_location}
                        </Grid>
                        <Grid direction="row" container item className={classes.companyCard} xs={10}>
                            {this.displayTopFiveHighPayCompanies()}
                        </Grid>
                    </Grid>
                    </>
                }
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {} )(withStyles(styles)(salaries))
