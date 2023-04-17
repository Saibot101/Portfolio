<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Scarping building information from the official website from the city of Frankfurt am Main
    </h1>
    <v-row justify="center" class="mt-10">
      <h2 class="text-h4">Contents</h2>
    </v-row>
    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i+1 }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>

    <v-row justify="center" id="introduction">
      <h2 class="text-h4">Introduction</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'The city Frankfurt published in the middle of 2021 their data to all building. These can be visited on the website https://geoportal.frankfurt.de/karte/#. In the basic view the satellite images from the images are visible. If the 3D view is activated, for every building a box with the dimensions gets visible. Through clicking on the box, information about the specific house gets visible. '">
    </ParagraphSnippet>
    <ParagraphSnippet :paragraph="'In a more thorough inspection of the website, it gets apparent, that the website loads two specific types of data. One of these are b3dm files. B3dm files are used by the JavaScript framework cesium for geospatial visualization. In a closer inspection of one of these files, it gets clear, that there is stored the wanted information about the buildings. The next question is how the framework knows, when to load a specific b3dm file with the right information. This knowledge is stored in JSON-files, which corresponds to specific location of the city. For this case there are 10 files. In there are all the URI to the b3dm files.'">
    </ParagraphSnippet>
    <v-row justify="center" id="get">
      <h2 class="text-h4">Get b3dm URI</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'For the scraping of the data were the packages requests, json and pandas used.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="packages"></CodeSnippet>
    <ParagraphSnippet :paragraph="'In this array are all links to the mentioned JSON-files stored.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="urls"></CodeSnippet>
    <ParagraphSnippet :paragraph="'If the request does not contain a header with the Origin property set right, the website will response with an error.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="header"></CodeSnippet>
    <ParagraphSnippet :paragraph="'All URL will be requested, and the response will be processed in this strange way. Because the URIs are 4 layers deep in a nested JSON, it is necessary to loop through all layers to get every URI.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="uri"></CodeSnippet>
    <v-row justify="center" id="read">
      <h2 class="text-h4">Read b3dm files</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'To read all values from the following request, a function is created. Because not every information is for every building available and is not predictable, when it will be missing, if statements prevents errors.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="read_values"></CodeSnippet>
    <ParagraphSnippet :paragraph="'The b3dm file consists of two parts. In the first part is a JSON with the information about the building. Because it is only possible to read the b3dm as byte-string, the JSON needs to be extracted via string manipulation. There gets the string increasingly manipulated to that point, that it can be load with the json package. After that the important information are read with the mentioned function.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="scrape"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Finally, the information is load into a pandas DataFrame. With that it can be stored in many different variations.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="save"></CodeSnippet>
  </v-container>
</template>
<script>
import CodeSnippet from "../../components/CodeSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";

export default {
  components: { CodeSnippet, ParagraphSnippet },
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
        { name: "Get b3dm URI", scroll: "get" },
        { name: "Read b3dm files", scroll: "read" },
      ],
      packages: [
        'import requests',
        'import json',
        'import pandas as pd'
      ],
      urls: [
        'list_url_json = [',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2146/453.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2147/453.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2145/453.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2144/453.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2146/452.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2147/452.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2145/454.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2146/454.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2144/454.json?v=179089231568",',
        '  "https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/11/2147/454.json?v=179089231568"',
        ']',
      ],
      header: [
        'header = {',
        '  "referrerPolicy": "strict-origin-when-cross-origin",',
        '  "body": "null",',
        '  "mode": "cors",',
        '  "credentials": "omit",',
        '  "Accept": "*/*",',
        '  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",',
        '  "Origin": "https://frankfurt.de/",',
        '  "Accept-Encoding": "gzip, deflate, br",',
        '  "Connection": "keep-alive",',
        '  "Referer": "https://geoportal.frankfurt.de/karte/"',
        '}',
      ],
      uri: [
        'uri_list = set()',
        ' ',
        'for url in list_url_json:',
        '  response2 = requests.get(url, headers = header).json()',
        ' ',
        '  for first in response2["root"]["children"]:',
        '    if first.get("content",{}).get("uri"):',
        '      uri_list.add(first["content"]["uri"])',
        '    for second in first["children"]:',
        '      if second.get("content",{}).get("uri"):',
        '        uri_list.add(second["content"]["uri"])',
        '      for third in second["children"]:',
        '        if third.get("content",{}).get("uri"):',
        '          uri_list.add(third["content"]["uri"])',
        '        for forth in third["children"]:',
        '          if forth.get("content",{}).get("uri"):',
        '            uri_list.add(forth["content"]["uri"])'
      ],
      read_values: [
        'def read_values(item):',
        '  obj = {}',
        '  if "HEHHHOH" in item:',
        '    obj["HEHHHOH"] = item["HEHHHOH"]',
        '  if "HFTHOH" in item:',
        '    obj["HFTHOH"] = item["HFTHOH"]',
        '  if "HTFHOH" in item:',
        '    obj["HTFHOH"] = item["HTFHOH"]',
        '  if "LAGE" in item:',
        '    obj["LAGE"] = item["LAGE"]',
        '  if "Firsthoehe" in item:',
        '    obj["Firsthoehe"] = item["Firsthoehe"]',
        '  if "measuredHeight" in item:',
        '    obj["measuredHeight"] = item["measuredHeight"]',
        '  if "SDG" in item:',
        '    obj["SDG"] = item["SDG"]',
        '  if "AOG" in item:',
        '    obj["AOG"] = item["AOG"]',
        '  if "Eingangshoehe" in item:',
        '    obj["Eingangshoehe"] = item["Eingangshoehe"]',
        '  if "BEG" in item:',
        '    obj["BEG"] = item["BEG"]',
        '  if "DAF" in item:',
        '    obj["DAF"] = item["DAF"]',
        '  if "KGF" in item:',
        '    obj["KGF"] = item["KGF"]',
        '  if "UID" in item:',
        '    obj["UID"] = item["UID"]',
        '  if "GRF" in item:',
        '    obj["GRF"] = item["GRF"]',
        '  if "Traufhoehe" in item:',
        '    obj["Traufhoehe"] = item["Traufhoehe"]',
        '  return obj'
      ],
      scrape: [
        'adresses = []',
        ' ',
        'for x,uri in enumerate(uri_list):',
        ' ',
        '  uri = uri.replace("../../","")',
        ' ',
        '  final_b3dm_raw = requests.get("https://geoportal.frankfurt.de/3Dnet/Geb_LoD2_farbig/"+uri+"?v=179089231568", headers = header).content',
        ' ',
        '  final_test_split = str(final_b3dm_raw).split("glTF")',
        '  final_test_string = final_test_split[0]',
        "  final_test_string = final_test_string.replace('\\n', '')",
        '  final_test_string = final_test_string[final_test_string.find(\'{"DatenquelleDachhoehe\'):]',
        "  final_test_string = final_test_string.replace(' ', '')",
        "  final_test_string = final_test_string.replace('}{', '},{')",
        '  final_test_string = "["+final_test_string+"]"',
        "  final_test_string = final_test_string.replace('\\\"', \"'\")",
        "  final_test_string = final_test_string.replace('\\\\', \'\')",
        "  final_test_string = final_test_string.replace('}]}]', '}]')",
        ' ',
        '  final_b3dm = json.loads(final_test_string)',
        '  for item in final_b3dm:',
        '    adresses.append(read_values(item))'
      ],
      save: [
        'final_df = pd.DataFrame(addresses)',
        'final_df.to_csv("addresses.csv", index=False)'
      ]
    }
  }
}
</script>