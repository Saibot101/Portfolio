<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Scraping Telemetr.io data to visualize the relative gain of members from specific telegram channels
    </h1>

    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>

    <v-row justify="center" id="introduction">
      <h2 class="text-h4" id="getting">Getting the data</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'Telemetr.io tracks different data from telegrams channels. Before the scraping begins, the channels with their unique id need to be researched. Also the packages requests and BeautifulSoup need to be added.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="packages"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'The specific data is in a table, which needs to be find inside the website, read and enriched with other useful information. The website would load the table with a script. So we do the same with the following request. '">
    </ParagraphSnippet>
    <CodeSnippet :code_array="website"></CodeSnippet>
    <ParagraphSnippet :paragraph="'With the find function from BeautifulSoup, the specific div element will be searched with a unique class attribute.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="table"></CodeSnippet>
    <ParagraphSnippet :paragraph="'After the table was found, the three columns date, change and absolute are read from table and stored in a new list.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="table_extraction"></CodeSnippet>
    <v-row justify="center" id="introduction">
      <h2 class="text-h4" id="preparation">Preparation of the data</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'For the preparation of the was the package pandas and dateutil used. The pandas DataFrame will be also used for the visualization of the data.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="packages_2"></CodeSnippet>

    <ParagraphSnippet
      :paragraph="'Firstly, every channel with less than 50 entries will be removed and not considered for the visualization. The date and the absolute number will be parsed to their specific format, so that plotly knows there is a time series object. The absolute values will be also reversed and the relative gains to their starting point will be also calculated.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="vis_prep"></CodeSnippet>
    <v-row justify="center" id="introduction">
      <h2 class="text-h4" id="visualization">Visualization the data</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'In the last step the final DataFrame will be created and with the library plotly the final graph created.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="vis"></CodeSnippet>


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

import data from "./js_array.json"

export default {
  components: { CodeSnippet, ParagraphSnippet, "apexchart": VueApexCharts, },
  methods: {
    scroll(item) {
      //this.$vuetify.goTo("." + item.scroll);
      document.getElementById(item).scrollIntoView()
    },
  },
  beforeMount() {
    console.log(data)
    this.series = data
  },

  data() {
    return {
      list_inhalt: [
        { name: "Getting the data", scroll: "getting" },
        { name: "Preparation of the data", scroll: "preparation" },
        { name: "Visualization", scroll: "visualization" },
      ],
      series: [{
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
          text: 'Percentual progress from telegram channels',
          align: 'center'
        },

        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2);
            },
          },
          title: {
            text: 'Relative gain'
          },
        },
        xaxis: {
          type: 'datetime',
        },

      },
      packages: [
        'import requests',
        'from bs4 import BeautifulSoup',
        'import json',
        '',
        'f = open("names.json", encoding="utf-8")',
        'groups = json.load(f)',
        '',
        '#structure names',
        '[',
        '  {',
        '    "id": 1126188187,',
        '    "name": "QUERDENKEN (201 - ESSEN) | Diskussion & Austausch - Wir f\u00fcr das Grundgesetz"',
        '  },',
        ']',
      ],
      website: [
        'result = []',
        'for group in groups:',
        '  web = requests.get("https://telemetr.io/chart-ajax/"+ str(group["id"]) + "?typeContent=table&field=participant_count&aggregation=d&period=7")',
        '  group["result"]= web'
      ],
      table: [
        'for group in groups:',
        '  soup = BeautifulSoup(group["result"].content,"html.parser")',
        '  div=soup.find("div",{"class":"chart-table-body thin-scrollbar"})',
        '  group["html"] = div'
      ],
      table_extraction: [
        'reduced_list = []',
        'for group in groups:',
        '  try:',
        '    list_ = group["html"].findChildren()',
        '    data = []',
        '    for item in list_:',
        '      obj = {}',
        '      name_list = ["date","change","absolute"]',
        '      div_list = item.select("div")',
        '      for i,div in enumerate(div_list):',
        '        obj[name_list[i]] = div.text',
        '      if obj != {}:',
        '        data.append(obj)',
        '    reduced_list.append({',
        '      "id":group["id"],',
        '      "name":group["name"],',
        '      "data":data',
        '    })',
        '  except:',
        '    pass',
      ],
      packages_2: [
        '#we are using pandas for data storing and dateutil for date parsing',
        'import pandas as pd',
        'from dateutil import parser',
        'import plotly.express as px',
        ' ',
        '#we have a DataFrame with initial three empty columns',
        'df_graph = pd.DataFrame({"gain":[],"rows":[],"name":[]})'
      ],
      vis_prep: [
        'for group in reduced_list:',
        '',
        '  absolute = []',
        '  dates = []',
        ' ',
        '  #we only want groups, where we habe more then 50 data points',
        '    if len(group["data"]) >= 50:',
        '      for row in group["data"]:',
        '        #parse date',
        '        dt = parser.parse(row["date"]).date()',
        '        dates.append(dt)',
        ' ',
        '        #parse group size from string',
        '        if len(str(row["absolute"]).split(" ")) < 2:',
        '          absolute.append(int(row["absolute"]))',
        '        else:',
        '          split = str(row["absolute"]).split(" ")',
        '          value = "".join(split)',
        '          absolute.append(int(value))',
        ' ',
        '    # reverse date list, because the newest are at the beginning',
        '    dates.reverse()',
        '    final_dates = []',
        ' ',
        '    # format date into the right string',
        '    for date in dates:',
        '      final_dates.append(date.strftime("%Y-%m-%d"))',
        ' ',
        '    absolute.reverse()',
        '    start = absolute[0]',
        '    gain = []',
        ' ',
        '    #calcualte percentual gain',
        '    for item in absolute:',
        '      value = item/start',
        '      gain.append(value)',
        ' ',
        '    #save group id to every row',
        '    name = []',
        '    for x in range(len(gain)):',
        '      name.append(str(group["id"]))',
        ' ',
        '    #combine both DataFrames',
        '    new_df = pd.DataFrame({"gain":gain,"rows":final_dates,"name":name})',
        ' ',
        '    df_graph = pd.concat([df_graph, new_df])',
        ' ',
        '    data =[]',
        '    for row in range(len(gain)):',
        '      data.append([final_dates[row],gain[row]])',
      ],
      vis: [
        'fig = px.line(df_graph, y="gain", x="rows", color="name", title="Percentual progress from telegram channels")',
        'fig.write_html("graph.html")',
        'fig.update_layout(',
        '  xaxis_title="Days",',
        '  yaxis_title="Relative gain",',
        '  legend_title="groups"',
        ')',
        'fig.show()'
      ]
    }
  }
}
</script>