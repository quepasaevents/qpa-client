import {EmotionCritical} from "create-emotion-server"
import {HelmetData} from "react-helmet"

interface TemplateProps {
    appBody: string
    apolloData: string
    helmet: HelmetData,
    emotionCritical: EmotionCritical
}
export default ({ appBody, apolloData, helmet, emotionCritical }: TemplateProps) => `<!doctype HTML>
<html lang="en" ${helmet.htmlAttributes.toString() }>
    <head>
        <meta charset="UTF-8">
        ${helmet.meta.toString()}
        <title>Quepasa Alpujarra</title>
        <script type="application/javascript">
            __APOLLO_DATA__ = ${apolloData};
            __EMOTION_CRITICAL_IDS_ = ${JSON.stringify(emotionCritical.ids)}
        </script>
    </head>
    <body>
        <div id="app">${appBody}</div>
        <script type="application/javascript" src="/main.bundle.js"></script>
    </body>
</html>
`
