<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Clustering messages from a german telegram channel
    </h1>
    <v-row justify="center" id="introduction" class="mt-10">
      <h2 class="text-h4">Contents</h2>
    </v-row>
    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i + 1 }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>
    <v-row justify="center" id="introduction">
      <h2 class="text-h4">Introduction</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'Text messages can be clustered in bins. In this post, K-Means was used to cluster telegram chat messages in bins. Because clustering is an unsupervised learning method, it is unpredictable, which message will be sorted in which bin and which word has the most impact in every bin. Clustering is an explorative method for researching text messages and the result of the cluster calculation highly depends on the parameters given to the algorithm. This blog post is inspired by a blog post from Tobias Sterbak (https://www.depends-on-the-definition.com/cluster-discovery/).'">
    </ParagraphSnippet>
    <v-row justify="center" id="textpreparation">
      <h2 class="text-h4">Text Preparation</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'After the download of the messages from the telegram desktop app, the data needs to be loaded first. After that the status messages get removed, so that only the real messages are left.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="text_preparation"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Telegram stores the messages in an array and the normal message as a string. But if this message contains for example underline parts, then this part is stored as an object with the key “underline”. From these objects will be only the message part stored. Because there are many different other text components, only the useful with relevant text will be kept.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="text_preparation_1"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Because the messages are still stored as an array, the messages will be combined to one string.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="text_preparation_2"></CodeSnippet>
    <ParagraphSnippet :paragraph="'The last step in the text preparation step is to filter the empty messages.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="text_preparation_3"></CodeSnippet>
    <v-row justify="center" id="textcleaning">
      <h2 class="text-h4">Text Cleaning</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'The HannoverTagger is especially trained for the German language, so might perform better compared to a more popular English word tagger.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="cleaning_packages"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Because there are many emojis in the message, this message was created to filter them out, so they cannot influence the calculation of the cluster algorithm.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="cleaning"></CodeSnippet>
    <ParagraphSnippet :paragraph="'In the first part of the loop the words are transformed to their principal form. Also, every word changed either to upper or lower case. That is necessary for a good performance of the algorithm. If the words are not transformed the algorithm would not recognize that House and house are the same words. Also, it would be helpful if house and Houses are treated as ware, they the same word. In the second part every word will be filtered out, that is not a noun or verb. This tries to reduce the number of words and therefore the complexity and focus on the “most important” words of sentence.In the last part of the loop the emojis in the messages will be removed.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="cleaning_1"></CodeSnippet>
    <v-row justify="center" id="clustercalculation">
      <h2 class="text-h4">Cluster Creation</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'For the clustering are the TfidfVectorrizer and the KMeans methods the most important methods. The LogisticRegression will be used to determine the most important words for each bin.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="cluster_packages"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Firstly, a TF-IDF statistic will be created from the messages. The stop_word argument was given in the method to fill words out, that have no importance in regard of the meaning of the sentence. This filter is important, if the TF-IDF statistic will be created with raw text, which was not cleaned before.Next, the KMeans algorithm with the given parameters is defined. Here needs to be decided how many clusters should be created. There are different methods to determine the optimal number of cluster like Elbow Curve Method or Silhoutte Analysis.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="cluster_calc"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Firstly, a method is created for getting the ten most important words for every bin. A logistic regression is used alongside a 10 times cross validation to calculate an accuracy score. After that the most important words per bin a calculated.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="cluster_out"></CodeSnippet>
    <ParagraphSnippet :paragraph="'For the telegram channel “Freie Sachsen” here are the ten most important words per bin with coefficient from the linear regression. For example, the topic of cluster zero and seven are about a German politician. Compulsory vaccination and related topics are the important in cluster six.'">
    </ParagraphSnippet>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <v-card outlined elevation="1" width="100vh" class="mt-5 pb-n5">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Cluster
                </th>
                <th class="text-left">
                  Words
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cluster" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.text }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
    <ParagraphSnippet :paragraph="'In the following diagram is the uneven distribution of the messages to the different bins visible. Cluster 1 has 4 times as many messages assigned then the second largest bin.'">
    </ParagraphSnippet>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <v-card outlined elevation="1" height="50vh" width="100vh" class="mt-5 pb-n5">
          <apexchart width="100%" height="100%" type="bar" :options="chartOptions" :series="series"></apexchart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CodeSnippet from "../../components/CodeSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: { CodeSnippet, ParagraphSnippet, "apexchart": VueApexCharts },
  methods: {
    scroll(item) {
      //this.$vuetify.goTo("." + item.scroll);
      document.getElementById(item).scrollIntoView({ behavior: "smooth" })
    },
  },

  data() {
    return {
      list_inhalt: [
        { name: "Introduction", scroll: "introduction" },
        { name: "Text Preparation", scroll: "textpreparation" },
        { name: "Text Cleaning", scroll: "textcleaning" },
        { name: "Cluster Creation", scroll: "clustercalculation" },
      ],
      series: [{
        name: "messages",
        data: [130, 1603, 441, 103, 424, 136, 180, 347, 89, 87]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
        }, plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        xaxis: {
          type: 'category',
          categories: ["Cluster 0", "Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4", "Cluster 5", "Cluster 6", "Cluster 7", "Cluster 8", "Cluster 9",]

        },
        title: {
          text: 'Cluster distribution',
        },
      },
      cluster: [
        { "name": "0", "text": "('wanderwitz', 25.31), ('cdu', 21.38), ('kaden', 19.34), ('kandidat', 18.76), ('thomas', 13.75), ('stefan', 10.7), ('plauen', 9.26), ('bürgermeisterwahl', 8.41), ('antritt', 8.19), ('wahl', 7.05)" },
        { "name": "1", "text": "('coronapartei', 12.83), ('kind', 11.33), ('afd', 11.0), ('geschichte', 9.18), ('partei', 8.87), ('oest', 8.63), ('ausgangssperre', 8.57), ('maskenpflicht', 8.14), ('reuter', 7.96), ('staatsanwalt', 7.81)" },
        { "name": "2", "text": "('polizei', 36.09), ('polizist', 18.67), ('dresden', 17.8), ('zwickau', 13.81), ('kundgebung', 13.12), ('greiz', 12.07), ('spaziergänger', 12.0), ('demonstrant', 10.87), ('schandau', 10.84), ('versammlung', 9.86)" },
        { "name": "3", "text": "('freiberg', 36.52), ('montagabend', 4.88), ('impression', 3.12), ('spaziergangsverbot', 2.49), ('mutbürger', 2.17), ('straße', 1.9), ('map', 1.77), ('österreich', 1.76), ('luft', 1.49), ('freiheitsdrang', 1.47)" },
        { "name": "4", "text": "('spaziergang', 23.17), ('straße', 22.81), ('montag', 15.18), ('protest', 14.77), ('stadt', 13.61), ('leipzig', 11.77), ('spätsommer', 10.05), ('aufholbedarf', 9.43), ('chemnitz', 8.97), ('motto', 8.1)" },
        { "name": "5", "text": "('zwönitz', 34.76), ('triebert', 12.38), ('widerstandshochburg', 9.36), ('protesthochburg', 9.11), ('zwönitzer', 8.02), ('wolfgang', 5.14), ('polizei', 4.07), ('vogel', 4.0), ('söldner', 3.84), ('polizeikessel', 3.21)" },
        { "name": "6", "text": "('impfpflicht', 43.26), ('lauterbach', 20.37), ('pflege', 14.16), ('medizin', 13.3), ('herbst', 7.63), ('köpping', 6.8), ('ds', 5.43), ('pflegeberuf', 4.64), ('impfquote', 4.63), ('bundesgesundheitsminister', 4.54)" },
        { "name": "7", "text": "('kretschmer', 51.7), ('ministerpräsident', 20.27), ('michael', 10.74), ('einschüchterung', 9.05), ('lockdown', 8.26), ('leben', 7.33), ('krauß', 5.85), ('despot', 5.3), ('reaktion', 4.93), ('wort', 4.5)" },
        { "name": "8", "text": "'bautzen', 28.18), ('zeichen', 4.93), ('protesthochburg', 4.91), ('runatelegram', 4.54), ('bürgermasse', 1.89), ('impfverweigerer', 1.81), ('protestbewegung', 1.58), ('wendezeit', 1.52), ('video', 1.41), ('bild', 1.35)" },
        { "name": "9", "text": "('uhr', 12.25), ('markt', 9.66), ('ma', 8.27), ('harz', 3.69), ('livestream', 0.84), ('tag', 0.05), ('gruppendynamik', 0.0), ('gruppenzwang', 0.0), ('gruppenvergewaltigung', 0.0), ('gruppensport', 0.0)" },
      ],
      text_preparation: [
        'import json',
        ' ',
        "f = open('freie_sachsen.json', encoding='utf-8')",
        'data = json.load(f)',
        ' ',
        '#select only messages',
        'messages = []',
        'for item in data["messages"]:',
        '  if item["type"] == "message":',
        '    messages.append(item)',
        'data["messages"] = messages',
      ],
      text_preparation_1: [
        '#create select text and other text components',
        'text = []',
        'messages_object = []',
        "object_types = ['bold', 'italic', 'code', 'underline', 'strikethrough']",
        'for message in data["messages"]:',
        '  for item in message["text"]:',
        '    if type(item) == str:',
        '      text.append(item)',
        '    elif item["type"] in object_types:',
        '      text.append(item["text"])',
        '  messages_object.append(text)',
        '  text = []',
        'data["text"] = messages_object',
      ],
      text_preparation_2: [
        '#combine fragments to message',
        'string = ""',
        'messages_string = []',
        'for message in data["text"]:',
        '  for item in message:',
        '    string = string + item',
        '  messages_string.append(string)',
        '  string = ""',
        'data["string"] = messages_string',
      ],
      text_preparation_3: [
        'cleaned_string = []',
        'for item in data["string"]:',
        '  if item != "":',
        '    cleaned_string.append(item)',
        'data["string_cleaned"] = cleaned_string',
        'data["text"] = []',
        'data["messages"] = []'
      ],
      cleaning_packages: [
        'from HanTa import HanoverTagger as ht',
        'import nltk',
        'import re',
      ],
      cleaning: [
        'def remove_emojis(data):',
        '  emoj = re.compile("["',
        '    u"\\U0001F600-\\U0001F64F"',
        '    u"\\U0001F300-\\U0001F5FF"',
        '    u"\\U0001F680-\\U0001F6FF"  ',
        '    u"\\U0001F1E0-\\U0001F1FF"',
        '    u"\\U00002500-\\U00002BEF"',
        '    u"\\U00002702-\\U000027B0"',
        '    u"\\U00002702-\\U000027B0"',
        '    u"\\U000024C2-\\U0001F251"',
        '    u"\\U0001f926-\\U0001f937"',
        '    u"\\U00010000-\\U0010ffff"',
        '    u"\\u2640-\\u2642"',
        '    u"\\u2600-\\u2B55"',
        '    u"\\u200d"',
        '    u"\\u23cf"',
        '    u"\\u23e9"',
        '    u"\\u231a"',
        '    u"\\ufe0f"',
        '    u"\\u3030"',
        '  "]+", re.UNICODE)',
        '  return re.sub(emoj, "", data)',
        ' ',
      ],
      cleaning_1: [
        "tagger = ht.HanoverTagger('morphmodel_ger.pgz')",
        'list_of_part_of_speech = ["NN","NE","VVFIN","VAFIN","VMFIN","VVINF","VAINF","VMINF"',
        '     ,"VVIMP","VAIMP","VVPP","VAPP","VMPP","VVIZU"]',
        'list_of_not_used = []',
        '',
        'for i,message in enumerate(data["string_cleaned"]):',
        '  words = nltk.word_tokenize(message)',
        '  lemmata = tagger.tag_sent(words,taglevel= 1)',
        ' ',
        '  message_2 = ""',
        '  for lemma in lemmata:',
        '    if lemma[2] in list_of_part_of_speech:',
        '      message_2 = message_2 + " " + lemma[1]',
        '    else:',
        '      if lemma[2] not in list_of_not_used:',
        '        list_of_not_used.append(lemma[2])',
        ' ',
        '  text = remove_emojis(message_2.replace("\\n", " ")).strip()',
        '  text_Message = text.replace(" --",".")',
        ' ',
        '  data["text"].append(text_Message)',
      ],
      cluster_calc: [
        'vectorizer = TfidfVectorizer(',
        "  stop_words=stopwords.words('german'),",
        ')',
        'X = vectorizer.fit_transform(data["text"])',
        ' ',
        'model = KMeans(n_clusters=10, init="k-means++", random_state=2019, max_iter=300, n_init=16, algorithm="lloyd")',
        'model.fit(X)',
        'cluster = model.predict(X)',
        ' ',
        'messages = data["text"]',
      ],
      cluster_packages: [
        'from sklearn.feature_extraction.text import TfidfVectorizer',
        'from sklearn.cluster import KMeans',
        'from nltk.corpus import stopwords',
        'from sklearn.linear_model import LogisticRegression',
        'from sklearn.metrics import accuracy_score',
        'from sklearn.model_selection import cross_val_predict',
        'import numpy as np',
      ],
      cluster_out: [
        'def get_important_words(cluster, lr, vectorizer, n=10):',
        '  inv_vocab = {v:k for k,v in vectorizer.vocabulary_.items()}',
        '  coef = lr.coef_[cluster]',
        '  top_n = coef.argsort()[-n:][::-1]',
        '  print([(inv_vocab[k], round(coef[k],2)) for k in top_n])',
        ' ',
        'lr = LogisticRegression(n_jobs=2, penalty="l1",',
        '     multi_class="ovr", C=10.0,',
        '     random_state=2019, solver="saga")',
        ' ',
        'proba = cross_val_predict(lr, X, cluster, cv=10, n_jobs=8, method="predict_proba")',
        'preds = proba.argmax(axis=1)',
        ' ',
        'print(accuracy_score(cluster, preds))',
        ' ',
        'lr.fit(X, cluster)',
        'lr.coef_.shape',
        ' ',
        'for c in sorted(np.unique(cluster)):',
        '  print(f"Cluster: {c}")',
        '  get_important_words(cluster=c, lr=lr, vectorizer=data["vec"], n=10)',
        '  print(126*"#")'
      ]

    }
  }
}
</script>