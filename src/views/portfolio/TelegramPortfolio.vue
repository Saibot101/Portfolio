<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      Visualizing telegram channels in a networkgraph with the python package pyvis
    </h1>
    <v-row justify="center">
      <v-list dense>
        <v-list-item v-for="(item, i) in list_inhalt" :key="i" @click="scroll(item.scroll)">
          {{ i }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>
    <v-row justify="center" id="introduction">
      <h2 class="text-h4">Introduction</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'For the analysis the biggest German telegram channels were downloaded with information unique information about the channel members. The requirement for the selection of a channel was, that must have 100 members. With this requirement the final selection were 48 channels. The channels are not connected to a specific region in Germany and spread out evenly around the country.'">
    </ParagraphSnippet>

    <v-row justify="center" id="preperation">
      <h2 class="text-h4">Preparation of the data</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'The data was scraped with the python package telethon. The json is in the following format:'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="json"></CodeSnippet>
    <CodeSnippet :code_array="start"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'Firstly, every user gets sorted out, if it is bot or is a less then 6 channels. If the number of channels a user is too low, then to many users with connections are in the network graph and the simulation does not run smoothly.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="filter_1"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'For every pair of users, the coexistence in the same channels gets counted. That is important for the simulation of the network graph. Two users, who share many channels, should be closer together then two users, who only share on channel.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="pair"></CodeSnippet>
    <ParagraphSnippet :paragraph="'Because there are too many edges in the graph, they will be also filtered.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="filter_2"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'In the following step the fundamental preparations for the visualization of the graph are done. This includes the nodes, the size of the nodes, the label for the nodes and the corresponding color.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="vis_graph"></CodeSnippet>
    <v-row justify="center" id="visualization">
      <h2 class="text-h4">Visualization</h2>
    </v-row>
    <ParagraphSnippet
      :paragraph="'With the package pyvis the network will created. For the physic engine the algorithm Barnes Hut was selected. Also, the nodes and edges are added to the network.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="network"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'In the first tries node were visible which had no edge to any other node. So, the number of nodes per user were calculated.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="nodes"></CodeSnippet>
    <ParagraphSnippet :paragraph="'If the calculated number is 0, then the user will be removed from the network.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="delete_"></CodeSnippet>
    <ParagraphSnippet
      :paragraph="'Before the graph will be calculated again, the existence of the nodes from the edges in the reduced list will be checked.'">
    </ParagraphSnippet>
    <CodeSnippet :code_array="end"></CodeSnippet>
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
        { name: "Preparation", scroll: "preperation" },
        { name: "Visualization", scroll: "visualization" },
      ],
      json: [
      '[',
      '  {',
      '    "channel":"channel_name",',
      '    "user":[',
      '      {',
      '        "id":1234,',
      '        "user":"name",',
      '        "is_bot":true,',
      '      },',
      '    ]',
      '  },',
      ']'
      ],
      start: [
        'import json',
        'g = open("json file","r")',
        'data = json.load(g)',
        '',
        '#get every user',
        'user_list = []',
        'for item in data:',
        '  for user in item["user"]:',
        '    user_list_entry = list(filter(lambda x:x["id"]==user["id"],user_list))',
        '    if user_list_entry ==[]: ',
        '      user_list.append({',
        '        "id":user["id"],',
        '        "group":[user["id"]],',
        '        "is_bot":user["is_bot"],',
        '      })',
        '    else:',
        '      pos=user_list.index(user_list_entry[0])',
        '      user_list[pos]["group"].append(item["group"])',
      ],
      filter_1: [
        'short_list_without_bots=[]',
        'for item in user_list:',
        '  if len(item["group"])>=6 and item["is_bot"] == False:',
        '    short_list_without_bots.append(item)'
      ],
      pair: [
        'array_user = []',
        'for i,user in enumerate(short_list_without_bots):',
        '  #go through every group',
        '  for j in range(i+1, len(short_list_without_bots)):',
        '    obj = {"from":user["id"], "to":short_list_without_bots[j]["id"],"strength":0}',
        '',
        '    for group in user["group"]:',
        '      if group in short_list_without_bots[j]["group"]:',
        '        obj["strength"] += 1',
        '    array_user.append(obj)',
        'array_user=list(filter(lambda item: item["to"] != item["from"],array_user))'
      ],
      filter_2: [
        'array_user_filtered = []',
        'for item in array_user:',
        '  if item["strength"] >= 6:',
        '    array_user_filtered.append(item)'
      ],
      vis_graph: [
        'nodes_user=[]',
        'values_user=[]',
        'label_user=[]',
        'color_user=[]',
        'for item in short_list_without_bots:',
        '  values_user.append(len(item["group"]))',
        '  label_user.append(str(item["id"]))',
        '  nodes_user.append(item["group"])',
        '',
        '  if 5 > len(item["group"]):',
        '    color_user.append("green")',
        '  elif 10 > len(item["group"]) >= 5:',
        '    color_user.append("blue")',
        '  elif 20 > len(item["group"]) >= 10:',
        '    color_user.append("yellow")',
        '  elif 30 > len(item["group"]) >= 20:',
        '    color_user.append("red")',
        '  elif len(item["group"]) >= 30:',
        '    color_user.append("black")',
      ],
      network: [
        'from pyvis.network import Network',
        'g = Network(height="100%",width="100%")',
        "g.barnes_hut()",
        "g.add_nodes(nodes_user, value=values_user, title=label_user, label=label_user, color=color_user)",
        "g.toggle_physics(True)",
        "for item in array_user_filtered:",
        '  g.add_edge(item["from"], item["to"], value=int(item["strength"]*10), hidde =True)',
        'g.show("network.html")'
      ],
      nodes: [
        'id_list=[]',
        'for item in short_list_without_bots:',
        '  id_list.append({"id":item["id"],"count":0})',
        '',
        'for item in array_user_filtered:',
        '  for id in id_list:',
        '    if item["from"] == id["id"]:',
        '      id["count"] += 1',
        '    if item["to"] == id["id"]:',
        '      id["count"] += 1',
      ],
      delete_: [
        'for item in id_list:',
        '  if item["count"] == 0:',
        '    index = nodes_user.index(item["id"])',
        '    nodes_user.pop(index)',
        '    values_user.pop(index)',
        '    label_user.pop(index)',
        '    color_user.pop(index)',
        '',
        'array_user_filtered_2 = []',
        'for edge in array_user_filtered:',
        '  if edge["from"] in nodes_user and edge["to"] in ndes_user:',
        '    array_user_filtered_2.append(edge)'
      ],
      end: [
        'filtered = Network(height="100%",width="100%")',
        'filtered.barnes_hut()',
        'filtered.add_nodes(nodes_user, value=values_user, title=label_user, label=label_user, color=color_user)',
        'filtered.toggle_physics(True)',
        'for item in array_user_filtered_2:',
        '  filtered.add_edge(item["from"],item["from"],value=int(item["strength"]*10), hidden=True)',
        'filtered.show("filtered.html")'
      ]
    }
  }
}
</script>