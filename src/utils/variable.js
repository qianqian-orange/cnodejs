export const tabTranslationMap = {
  ask: '问答',
  share: '分享',
  job: '招聘',
  good: '精华'
}

export const markdown = {
  '& h2': {
    lineHeight: '40px',
    marginTop: 30,
    marginBottom: 15,
    borderBottom: '1px solid #eee'
  },
  '& h2:nth-of-type(1)': {
    marginTop: 0
  },
  '& p': {
    fontSize: '15px',
    lineHeight: '1.7em',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: '#333'
  },
  '& ul': {
    padding: 0,
    margin: '0 0 10px 25px'
  },
  '& li': {
    fontSize: '14px',
    lineHeight: '2em',
    wordBreak: 'break-word'
  },
  '& pre': {
    margin: '20px -10px',
    padding: '0 15px',
    backgroundColor: '#f7f7f7',
    fontSize: '14px'
  },
  '& pre code': {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    lineHeight: '1.7em'
  },
  '& a': {
    color: '#08c'
  },
  '& blockquote': {
    padding: '0 0 0 15px',
    margin: ' 0 0 20px',
    borderLeft: '5px solid #eee'
  },
  '& img': {
    maxWidth: '100%',
    verticalAlign: 'middle'
  }
}

export const tabMap = {
  all: {
    label: '全部',
    value: 'all'
  },
  good: {
    label: '精品',
    value: 'good'
  },
  ask: {
    label: '问答',
    value: 'ask'
  },
  job: {
    label: '招聘',
    value: 'job'
  },
  share: {
    label: '分享',
    value: 'share'
  }
}

export default {
  tabTranslationMap,
  markdown,
  tabMap
}