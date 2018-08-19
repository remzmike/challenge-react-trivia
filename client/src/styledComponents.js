import styled from 'styled-components';

export const StyledApp = styled.div`
  margin: auto;
  width: 66%;
  min-width: 320px;
  box-sizing: border-box;
`

export const Button = styled.button`
  text-align: center;
  cursor: pointer;
  border: none;
  height: 5.4rem;

  box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.15);
  font-size: 2rem;
  line-height: 1.6rem;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  background: #fafafa;
  color: #222222;

  text-shadow: 1px 1px 0 #f9f9f9;
  padding: 12px 20px;
  width: 100%;
  box-sizing: border-box;

  border: 1px solid #bbb;

  &:hover {
    background: #e7eff4;
    color:#000040;
  }

  &:disabled {
      color: #888;
  }
`

export const Panel = styled.div`
  min-height: 540px;
  font-size: 1.4rem;
  line-height: 1.8rem;

  padding: 3rem 0rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  max-width: 640px;
  margin: auto;
`

export const PanelTitle = styled.div`    
  margin: 0;
  padding: 1rem 2rem;
  text-align: center;
  background-color: #445;
  color: white;

  > div {
      min-height: ${1.8 * 3}rem;
      display:table;
      width:100%;    
      > div {
          display: table-cell;
          vertical-align: middle;        
      }
  }
}
`

export const PanelContent = styled.div`
  background: #ffffef;
  min-height: 320px;
  padding: 2rem 2rem;
  border: 1px solid #bbb;
  border-bottom: 0px;

  flex: 1 1 auto;

  overflow-y: auto;
`

export const PanelFooter = styled.div`
  background: #ffffef;
  border-left:1px solid #bbb;
  border-right:1px solid #bbb;
  min-height: 2rem;
  
  > div {
      text-align: center;
  }
}
`

export const PanelButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const ResultLine = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const ResultIcon = styled.span`
  font-weight: bold;
  padding-top: -2rem;
  min-width: 2rem;
  display: inline-block;
  text-align: center;
`
