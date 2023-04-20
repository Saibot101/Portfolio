<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Determine sentiment from german telegram channel
    </h1>
    <v-row justify="center" class="mt-10">
      <h2 class="text-h4">Contents</h2>
    </v-row>
    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i + 1 }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>
    <v-row justify="center" id="introduction" class="mt-10">
      <h2 class="text-h4">Introduction</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'The sentiment from a text gives you clues about the feelings from the sender while sending. For example, it can be helpful for customer satisfaction to read the sentiment from text messages and treat messages with different sentiment differently. So, the sentiment helps to better understand the customer. In this blog the sentiment to only German messages will be evaluated.'">
    </ParagraphSnippet>
    <v-row justify="center" id="textpreparation" class="mt-10">
      <h2 class="text-h4">Textpreparation</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'Because the text preparation was explained thoroughly in the blog entry to the topic clustering (https://saibot101.github.io/portfolio/port/cluster) and I do not want to write the same text twice, I left the skip the topic here.'">
    </ParagraphSnippet>
    <v-row justify="center" id="sentiment" class="mt-10">
      <h2 class="text-h4">Read Sentiment Python</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'Three different packages will be used to evaluate the sentiment of the messages. The most popular package from these three is spacy. Here an extension to the basic spacy will be used, which is based on SentiWS. Textblob and germansentiment are specially trained on the German language and more a niche package.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="packages"></CodeSnippet>
    <ParagraphSnippet :paragraph="'All models will be initialized. For spacy a pipeline will be created, that is loading the SentiWS model. That specific needs to be downloaded prior.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="init"></CodeSnippet>
    <ParagraphSnippet :paragraph="'After the messages got cleaned, the sentiment of the messages will be determined. For spacy the sentiment for all words of a message will be determined and then the mean of all the sentiments will be calculated.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="sentiment_python"></CodeSnippet>
    <v-row justify="center" id="node" class="mt-10">
      <h2 class="text-h4">Read Sentiment Node</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'The node package ml-sentiment allows to determine the sentiment for German messages. The package will be imported in the JavaScript file, the sentiment evaluated and stored to the file system.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="sentiment_js"></CodeSnippet>
    <v-row justify="center" id="visualization" class="mt-10">
      <h2 class="text-h4">Prepare visualization</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'For the visualization firstly the response from germansentiment needs to be converted, because the responses can be: “negative”, “neutral”, “positive”.  To make the transfer between Python and JavaScript easier, the responses are stored in a single JSON-array. For the visualization it is easier, to have separate arrays.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="prepare_sent"></CodeSnippet>
    <ParagraphSnippet :paragraph="'To smooth the line in the following line chart, a window of the size of 300 is calculated. That makes it easier to see and read trends in the chart.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="prepare_vis"></CodeSnippet>
    <ParagraphSnippet :paragraph="'In the chart can be the difference of the different packages admired. With better models that run on bigger hardware can be sentiment better determined. But it also shows how hard it is for not English written texts to be classified correctly. '">
    </ParagraphSnippet>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <v-card outlined elevation="1" height="50vh" width="100vh" class="mt-5 pb-n5">
          <apexchart width="100%" height="100%" type="line" :options="chartOptions" :series="series"></apexchart>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
import CodeSnippet from "../../components/CodeSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";
import VueApexCharts from 'vue3-apexcharts'

import data from "./final_sentiment.json"
export default {
  components: { CodeSnippet, ParagraphSnippet, "apexchart": VueApexCharts, },
  methods: {
    scroll(item) {
      //this.$vuetify.goTo("." + item.scroll);
      document.getElementById(item).scrollIntoView({ behavior: "smooth" })
    },
  },
  beforeMount() {
    this.series = data
  },
  data() {
    return {
      list_inhalt: [
        { name: "Introduction", scroll: "introduction" },
        { name: "Textpreparation", scroll: "textpreparation" },
        { name: "Read Sentiment Python", scroll: "sentiment" },
        { name: "Read Sentiment Node", scroll: "node" },
        { name: "Prepare visualization", scroll: "visualization" },
      ], series: [{
        name: 'Income',
        color: "#EE3A41",
        data: [[new Date("01.01.2021").getTime(), 1.330],]
      }],
      chartOptions: {
        chart: {
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Sentiment for all messages',
          align: 'center'
        },

        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2);
            },
          },
          title: {
            text: 'Sentiment'
          },
        },
        xaxis: {
          type: 'category',
          tickAmount: 10
        },
      },
      packages: [
        'from textblob_de import TextBlobDE as TextBlob',
        'from germansentiment import SentimentModel',
        'import spacy',
        'from spacy_sentiws import spaCySentiWS'
      ],
      init: [
        'model = SentimentModel()',
        'sentiment=[]',
        ' ',
        "nlp = spacy.load('de_core_news_sm')",
        "nlp.add_pipe('sentiws', config={'sentiws_path': './data/'})"
      ],
      sentiment_python: [
        'for i,message in enumerate(data["messages"]):',
        ' ',
        '  blob = TextBlob(message)',
        ' ',
        '  result = model.predict_sentiment([message])',
        ' ',
        '  doc = nlp(message)',
        '  sentiment_spacy = 0',
        '  count = 0',
        ' ',
        '  for token in doc:',
        '    if token._.sentiws != None:',
        '      sentiment_spacy += token._.sentiws',
        ' ',
        '  if count == 0:',
        '    count=1',
        ' ',
        '  sentiment.append({',
        '    "message": message,',
        '    "textblob":  blob.sentiment[0],',
        '    "sentimentModel":result,',
        '    "spacy":sentiment_spacy/count',
        '  })'
      ],
      sentiment_js: [
        "const ml = require('ml-sentiment')()",
        "for (let message of jsonData){",
        '  message["ml-sentiment"] = ml.classify(message["message"])',
        '}'
      ],
      prepare_sent: [
        'from statistics import mean',
        ' ',
        'sentimentModel = []',
        'textblob = []',
        'spacy = []',
        'ml_sentiment = []',
        ' ',
        'for item in sentiment:',
        '  if item["sentimentModel"][0] == "positive":',
        '    sentimentModel.append(1)',
        '  elif item["sentimentModel"][0]  == "neutral":',
        '    sentimentModel.append(0)',
        '  elif item["sentimentModel"][0]  == "negative":',
        '    sentimentModel.append(-1)',
        ' ',
        '  textblob.append(item["textblob"])',
        '  spacy.append(item["spacy"])',
        '  ml_sentiment.append(item["ml-sentiment"])'
      ],
      prepare_vis: [
        'window_list_sentiment = []',
        'window_list_textblob = []',
        'window_list_spacy = []',
        'window_list_ml_sentiment = []',
        ' ',
        'for i in range(len(sentiment) - window_size + 1):',
        '  window_list_spacy.append(mean(spacy[i: i + window_size]))',
        '  window_list_sentiment.append(mean(sentimentModel[i: i + window_size]))',
        '  window_list_textblob.append(mean(textblob[i: i + window_size]))',
        '  window_list_ml_sentiment.append(mean(ml_sentiment[i: i + window_size]))',
        ' ',
        'range_spacy = range(0,len(window_list_spacy))   ',
        'range_sentiment = range(0,len(window_list_sentiment)) ',
        'range_textblob = range(0,len(window_list_textblob))',
        'range_ml_sentiment = range(0,len(window_list_ml_sentiment))'
      ]
    }
  }
}
</script>