import React, { Component } from 'react'
import {listData} from '../../constant'
import {getHighlightList} from '../../utils'
import styles from './index.scss'

  class App extends Component{
       constructor (props) {
            super(props)

            this.state = {
                keyword : ''
            }
       }

       changeInput(value){
            this.setState({
                keyword : value
            })
       }


       renderResult = () =>{
           let {keyword} = this.state
            console.log(styles,'styles.word')
           return listData.map((text, index) => {
                let {list} = getHighlightList(text, keyword)
               return <p key={index} className={styles.word}>
                {
                        list.map(it => {
                            return <span style={{color: it.color}} key={it.text}>{it.text}</span>
                        })
                }
               </p>
           })
       }


       render () {
           return ( 
              <div>
                  <input onChange={(e)=>{this.changeInput(e.target.value)}}/>

                  {
                      this.renderResult()
                  }
              </div>
           )
        }

}

export default App