<template>
  <v-container>
    <h1 class="text-center mt-10 mb-5 text-h3">
      CI/CD of Cloud Functions including the Service by using Infrastructure as Code
    </h1>
    <v-row justify="center" id="introduction" class="mt-10">
      <h2 class="text-h4">Contents</h2>
    </v-row>
    <v-row justify="center">
      <v-list dense>
        <v-list-item
          v-for="(item, i) in list_inhalt"
          :key="i"
          @click="scroll(item.scroll)"
        >
          {{ i+1 }}. {{ item.name }}
        </v-list-item>
      </v-list>
    </v-row>
    <!-- 1 -->
    <v-row justify="center" id="introduction">
      <h2 class="text-h4">Introduction</h2>
    </v-row>
    <ParagraphSnippet :paragraph="'The goal of this blog entry to show and explaine how to use pipelines to create FaaS in an cloud environment and how to automatically install functions in the cluster. In the first part all steps will be explained in a way that you can follow it on your console. In the last stage the structure of the pipeline will be explained. If you are only interested in the pipeline then skip to chapter 5.'"></ParagraphSnippet>
    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">OpenFaas</h3>
    </v-row>
    <ParagraphSnippet :paragraph="'OpenFaas is an open-source project, which you can use to host your own FaaS.'"></ParagraphSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">CI/CD</h3>
    </v-row>

    <ParagraphSnippet
      :paragraph="'This pipeline focuses on the deployment aspects of CI/CD.'"
    ></ParagraphSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Github Actions</h3>
    </v-row>
    <ParagraphSnippet
      :paragraph="'If their are any changes in the terraform code or a function is pushed to the repository, the pipeline will be started and execute the code of the pipeline.'"
    ></ParagraphSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Terraform</h3>
    </v-row>
    <ParagraphSnippet
      :paragraph="'Terraform is a descriptive language for infrastructure. Terraform is used, to describe the Kubernetes cluster and configure a public IP in the Google Cloud.'"
    ></ParagraphSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Kubernetes</h3>
    </v-row>
    <ParagraphSnippet
      :paragraph="'Kubernetes allows to automate, scale and manage container. OpenFaas recommands using Kubernetes instead of a single container. It allows to have the container in different locations in the Google Cloud to increase uptime security.'"
    ></ParagraphSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Google Cloud</h3>
    </v-row>
    <ParagraphSnippet
      :paragraph="'Google Cloud is one of the biggest Cloud Provider. It has a generous credit policy, if you create a new account. The following Kubernetes cluster are paid services and will be deducted from your balance.'"
    ></ParagraphSnippet>

    <!-- 2 -->
    <v-row justify="center" id="google">
      <h2 class="text-h4">Create a Kuberntes cluster in the Cloud with Terraform</h2>
    </v-row>
    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Configure Google Cloud</h3>
    </v-row>

    <ParagraphSnippet
      :paragraph="'There are three steps in the initialization process. Firstly, install the Google Cloud SDK to your system.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ sudo apt install google-cloud-sdk']"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'Secondly, connect your local Google Cloud instance to your GCP account. '"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="['$ gcloud init']"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'Lastly, add the Google Account to the Application Default Credentials, so that Terraform can access the Credentials from Google Cloud.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ gcloud auth application-default login']"
    ></CmdSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Configure Kubernetes via Terraform</h3>
    </v-row>

    <ParagraphSnippet
      :paragraph="'The Terraform setup is based on a tutorial from Hashicorp. The tutorial can be found under the following link: https://github.com/hashicorp/learn-terraform-provision-gke-cluster. The tutorial is used as a base and will be changed and extended for the need of OpenFaas.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="[
        '$ git clone https://github.com/hashicorp/learn-terraform-provision-gke-cluster',
      ]"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'If you cloned the repository, change the starting repository for Terraform.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ cd learn-terraform-provision-gke-cluster']"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'The next step is changing the terraform.tfvars file. Enter your Google Project ID and add the region where you want the cluster to be created.'"
    ></ParagraphSnippet>
    <Code-Snippet :code_array="project"></Code-Snippet>

    <ParagraphSnippet
      :paragraph="'If you do not know your Project_ID, you can get it with the following command.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ gcloud config get-value project']"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'Describe the number of Google Kubernetes Engine nodes, which will be created in the cloud. In the example from Terraform are two nodes declared. An error will be raised when you use the free trail of Google Cloud. The next resource describes the GKE directly. Define the name and location for the Cluster, set the remove_default_node_pool to true and give an initial number of nodes. Name and location derive from the terraform.tfvars file. The remove_default_node_pool removes the default cluster as creating a cluster on your own increases flexibility and opens options for customization.'"
    ></ParagraphSnippet>
    <Code-Snippet :code_array="cluster_nodes"></Code-Snippet>

    <ParagraphSnippet
      :paragraph="'Next, declare the seperately managed node pool with the google_container_node_pool resource. Again, define the name and location. Then use the cluster and node_count you created earlier. The important information here is the machine_type. The machine_type variable declares the machine used in the Cluster. Machine types vary in their impact on the costs deducted from your Google Cloud account. A more expensive machine will potentially burn through the free trail.'"
    ></ParagraphSnippet>
    <Code-Snippet :code_array="node_pool"></Code-Snippet>

    <ParagraphSnippet
      :paragraph="'For the state management you can also use Google Cloud. To store the state of the system you need the right functioning of Terraform. If you want to store your state in the Google Cloud, you can create a Google Cloud Storage. Then add your bucket name in the file below. You can also save the state at another provider but then you need to change the code snippet below.'"
    ></ParagraphSnippet>
    <Code-Snippet :code_array="backend_store"></Code-Snippet>

    <ParagraphSnippet
      :paragraph="'The command “terraform init” gets the state and providers initialized.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="terraform_init"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'“apply” executes the terraform script and creates the cluster.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="terraform_apply"></CmdSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Get Kubernetes Configuration</h3>
    </v-row>

    <ParagraphSnippet
      :paragraph="'For the pipeline, add the kubeconfig from the created Cluster in the Google Cloud, so that you can access the cluster and install OpenFaas into it. To do that, download the Kubernetes Commandline tool.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="['$ sudo apt install kubectl']"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'Then, get the kubeconfig from Google and save it to your local system.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="kubernetes_entry"></CmdSnippet>

    <!-- 3 -->
    <v-row justify="center" id="installation">
      <h2 class="text-h4">Installation Openfaas</h2>
    </v-row>

    <ParagraphSnippet
      :paragraph="'The next step in the process is the installation of OpenFaas. Use the Arkade downloader from OpenFaas. Arkade is a marketplace for different Kubernetes services.'"
    ></ParagraphSnippet>

    <CmdSnippet
      :code_array="['$ curl -sLS https://get.arkade.dev | sudo sh ']"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'OpenFaas uses the kubeconfig for the installation, which you installed previously. Also, it is necessary to use the load-balancer from OpenFaas which connects to the Services from Google Cloud to use their public IP service.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="install_openfaas"></CmdSnippet>

    <!-- 4 -->
    <v-row justify="center" id="connection">
      <h2 class="text-h4">Connection to Openfaas</h2>
    </v-row>

    <ParagraphSnippet
      :paragraph="'There are two options to connect to the installed OpenFaas installation. The first one is to use the port-forward from Kubernetes and the second option is to connect over the public IP. To do this, install the OpenFaas Commandline tool.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ curl -sSL https://cli.openfaas.com | sudo sh']"
    ></CmdSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Port-forwarding</h3>
    </v-row>
    <ParagraphSnippet
      :paragraph="'The port-forwarding of the cluster is only possible if the installation process of OpenFaas is completed. This can be checked with the following command.'"
    ></ParagraphSnippet>

    <CmdSnippet
      :code_array="['$ kubectl rollout status -n openfaas deploy/gateway']"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'Next, forward the 8080 port of the Kubernetes cluster to your local 8080 port. You need to choose the 8080 port because that is the standard port on which OpenFaas is listening.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="[
        '$ kubectl port-forward -n openfaas svc/gateway 8080:8080 &',
      ]"
    ></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'For the login to OpenFaas you need the password. That can be retrieved with the Kubernetes command inside the brackets. To make it easier, you should save it into a variable on your system.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="openfaas_password"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'With the retrieved password you can now login as admin into your OpenFaas cluster.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="[
        'echo -n $PASSWORD | faas-cli login --username admin --password-stdin',
      ]"
    ></CmdSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Connection over public IP</h3>
    </v-row>

    <ParagraphSnippet
      :paragraph="'The second option to connect to OpenFaas is over a public IP which is not that different to the port-forwarding method. As the first step you need to get the public IP from your cluster. That can be achieved with the following command in the brackets. There should be no differences between different cloud service providers.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="openfaas_ip"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'Then, retrieve the password from the cluster.'"
    ></ParagraphSnippet>
    <CmdSnippet :code_array="openfaas_password"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'The difference in the login is the flag of the gateway. The default parameter of the faas-cli program in the port-forwarding option is your localhost on port 8080. If the flag were different, the program would try to connect to public address. The gateway IP you retrieved from the previous command is extended with the port 8080, on which OpenFaas will listen.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="[
        '$ echo -n $PASSWORD | faas-cli login --username admin --password-stdin --gateway http://$GATEWAY_IP:8080 ',
      ]"
    ></CmdSnippet>

    <!-- 5 -->
    <v-row justify="center" id="function">
      <h2 class="text-h4">Creating Functions</h2>
    </v-row>

    <ParagraphSnippet
      :paragraph="'There are two ways to add functions to your OpenFaas cluster. The first one is to add a function from the community store and the second one is to create a new function.'"
    ></ParagraphSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Add function from store</h3>
    </v-row>
    <ParagraphSnippet
      :paragraph="'The store is a collection of pre-build functions, which are created by the community. These are open-source and can be found under the following address: https://github.com/openfaas/store. These functions are hosted in public docker repositories and can be added via the command line or the user interface. One example function, which is used below, gives information about the nodes in the Kubernetes cluster. If the function is called, it will return the number of CPUs, hostname, OS and uptime.'"
    ></ParagraphSnippet>

    <CmdSnippet :code_array="openfaas_store"></CmdSnippet>

    <ParagraphSnippet
      :paragraph="'How you interact with the installed function depends on which connection variant you choose. This tutorial assumes, that you use a public IP. Therefore, you can call the function over its specific URL.'"
    ></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ curl $GATEWAY_IP/functions/NodeInfo']"
    ></CmdSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Add new function</h3>
    </v-row>
    
    <ParagraphSnippet :paragraph="'If you want to create your own function, you need to install Docker to your local system.'"></ParagraphSnippet>
    <CmdSnippet :code_array="download_docker"></CmdSnippet>

    <ParagraphSnippet :paragraph="'After the installation, connect your local docker instance to a public docker repository. If you do not have an account at a public docker repository, you can create it here: https://hub.docker.com/. Then, log in with the following command.'"></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ docker login --username user --password password']"
    ></CmdSnippet>

    <ParagraphSnippet :paragraph="'OpenFaas uses templates for the different programming languages. If you want to know, how many templates exist in which language in OpenFaas, use this link: https://docs.openfaas.com/cli/templates/#template-store.'"></ParagraphSnippet>
    <CmdSnippet :code_array="['$ faas-cli template pull']"></CmdSnippet>

    <ParagraphSnippet :paragraph="'This part shows the theoretical process of creating a new template. The section below shows the process of creating a python function. With the following command OpenFaas will create a yaml file, which contains the configuration of the function and a folder with files for the specific language.'"></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ faas-cli new function-name --lang template']"
    ></CmdSnippet>

    <ParagraphSnippet :paragraph="'Then, upload your function to your OpenFaas cluster. This process consists of three sub- commands. The rst command is build, where OpenFaas builds a docker image with the language speci c information in it. The second step is pushing the built docker image to your public docker repository. Finally, the docker image gets deployed in your Kubernetes cluster.'"></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ faas-cli up -f function-name.yml']"
    ></CmdSnippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Example function</h3>
    </v-row>
    <ParagraphSnippet :paragraph="'The process of creating a function is shown by the example of a python3 function.  Firstly, create the yaml and folder with the following command. You can change the name of the function from test to anything you want.'"></ParagraphSnippet>

    <CmdSnippet
      :code_array="['$ faas-cli new test --lang python3']"
    ></CmdSnippet>
    
    <ParagraphSnippet :paragraph="'Next, modify the previously created test.yml file. If your OpenFaas cluster is connected to a static URL, insert the gateway line into your url. If you only have the IP from your Cloud provider, it will be a lot easier for the automation, if you use a docker variable instead of hardcoding the IP into the configuration. The variable is given in the up command from OpenFaas. The second important change is the parameter image. There you define, where the docker image will be saved. The first parameter is the docker_id, the second is the repository name.'"></ParagraphSnippet>
    <Code-Snippet :code_array="test_yaml"></Code-Snippet>

    <ParagraphSnippet :paragraph="'The code of the function is defined in the file test/handler.py. In this example it will only return a string as response. Therefore, you do not need to add your used packages in the requirements.txt file. The python compiler will look into this file, determine which packages you used and on which version they are, so they can be downloaded.'"></ParagraphSnippet>
    <Code-Snippet :code_array="handler_py"></Code-Snippet>

    <ParagraphSnippet :paragraph="'To finish the creation process you need to upload the function. Here you mention the gateway IP, so that it can be inserted in the test.yml file.'"></ParagraphSnippet>
    <CmdSnippet
      :code_array="['$ URL=$GATEWAY_IP faas-cli up -f test.yml']"
    ></CmdSnippet>

    <!-- 6 -->
    <v-row justify="center" id="new">
      <h2 class="text-h4">Creating finale Pipelines</h2>
      
      
    </v-row>
    <ParagraphSnippet :paragraph="'To make the pipeline more readable and understandable, it is split into logical steps. There are two pipelines with two different tasks. There is a lot of overlap, so it is split into three parts. Both pipelines use the same initialization phase and differ afterwards.'"></ParagraphSnippet>
    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Initialization</h3>
    </v-row>
    <ParagraphSnippet :paragraph="'The first part is the configuration of Github specific settings. These can change depending on the pipeline provider. This defines on which branches the pipeline should trigger or which os it will run.'"></ParagraphSnippet>
    <Code-Snippet :code_array="initialization_1"></Code-Snippet>

    <ParagraphSnippet :paragraph="'The next section defines the packages, which will later be used. Depending on which pipeline you implement, not all packages need to be defined.'"></ParagraphSnippet>
    <Code-Snippet :code_array="initialization_2"></Code-Snippet>

    <ParagraphSnippet :paragraph="'To get a connection to Google Cloud inside the pipeline you need to download your specific credentials from Google Cloud. Then, add the credentials as secrets in your Github repository. When the step is executed, it will take the credentials from the secrets.'"></ParagraphSnippet>
    <Code-Snippet :code_array="initialization_3"></Code-Snippet>

    <ParagraphSnippet :paragraph="'You only need this section, if you want to create a new function. With the docker package, username and access_token you can get access to your docker hub account.'"></ParagraphSnippet>
    <Code-Snippet :code_array="initialization_4"></Code-Snippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Create Cluster, install OpenFaas and upload function</h3>
    </v-row>
    <ParagraphSnippet :paragraph="'For creating the cluster, the pipeline executes “terraform apply”. It is important to add the flag auto-approve because you cannot do it by hand. This step can take around 20 minutes.'"></ParagraphSnippet>
    <Code-Snippet :code_array="create_cluster_1"></Code-Snippet>

    <ParagraphSnippet :paragraph="'After the cluster is created, the pipeline receives the kubeconfig credentials from Google Cloud and saves them locally.'"></ParagraphSnippet>
    <Code-Snippet :code_array="create_cluster_2"></Code-Snippet>

    <ParagraphSnippet :paragraph="'With the credentials the pipeline will install OpenFaas into the cluster.'"></ParagraphSnippet>
    <Code-Snippet :code_array="create_cluster_3"></Code-Snippet>

    <ParagraphSnippet :paragraph="'It is possible, that the pipeline goes to the next step because some process in the background takes longer. That happens especially when using the IP address. Therefore, the pipeline waits 2 minutes to be sure, that everything is loaded and configured. After the waiting time the pipeline retrieves the IP and password from the pipeline.'"></ParagraphSnippet>
    <Code-Snippet :code_array="create_cluster_4"></Code-Snippet>

    <ParagraphSnippet :paragraph="'As the last step the pipeline will connect to OpenFaas and will install a function from the store as proof of work.'"></ParagraphSnippet>
    <Code-Snippet :code_array="create_cluster_5"></Code-Snippet>

    <v-row justify="center" class="mt-5">
      <h3 class="text-h5 font-weight-bold">Add function to existing cluster</h3>
    </v-row>
    <!-- <ParagraphSnippet :paragraph="''"></ParagraphSnippet> -->
    <ParagraphSnippet :paragraph="'This pipeline only works if there is an OpenFaas cluster running at your cloud provider. Firstly, the pipeline gets the Kubernetes credentials from Google Cloud.'"></ParagraphSnippet>
    <Code-Snippet :code_array="add_function_1"></Code-Snippet>

    <ParagraphSnippet :paragraph="'Then, it receives the IP and password for the OpenFaas connection.'"></ParagraphSnippet>
    <Code-Snippet :code_array="add_function_2"></Code-Snippet>

    <ParagraphSnippet :paragraph="'Lastly, upload the new function to the OpenFaas cluster. The function code and configuration file need to be in the Github repository. Currently, the pipeline cannot differentiate between different functions in the same repository. This pipeline is only a proof of work and needs to be extended for further tasks.'"></ParagraphSnippet>
    <Code-Snippet :code_array="add_function_3"></Code-Snippet>
  </v-container>
</template>
<script>
import CodeSnippet from "../../components/CodeSnippet.vue";
import CmdSnippet from "../../components/CmdSnippet.vue";
import ParagraphSnippet from "../../components/ParagraphSnippet.vue";
//import goTo from 'vuetify/lib/services/goto'
export default {
  name: "CloudPortfolio",
  components: { CodeSnippet, CmdSnippet, ParagraphSnippet },
  methods: {
    scroll(item) {
      //this.$vuetify.goTo("." + item.scroll);
      document.getElementById(item).scrollIntoView({ behavior: "smooth" })
    },
  },
  data: () => ({
    list_inhalt: [
      { name: "Introduction", scroll: "introduction" },
      { name: "Google Cloud", scroll: "google" },
      { name: "Installation Openfaas", scroll: "installation" },
      { name: "Connection Openfaas", scroll: "connection" },
      { name: "Creating Functions", scroll: "function" },
      { name: "Creating finale pipeline", scroll: "new" },
    ],
    project: [
      'project_id = "project_id"',
      'region       = "europe-west3"',
    ],
    cluster_nodes: [
      'variable "gke_num_nodes" {',
      "   default        = 1",
      '   description = "number of gke nodes"',
      "}",
      " ",
      "# GKE cluster",
      'resource "google_container_cluster" "primary" {',
      '   name     = "${var.project_id}-gke"',
      "   location = var.region",
      "   remove_default_node_pool = true",
      "   initial_node_count       = 1",
      " ",
      "   network    = google_compute_network.vpc.name",
      "   subnetwork = google_compute_subnetwork.subnet.name",
      " }",
    ],

    node_pool: [
      "# Separately Managed Node Pool",
      'resource "google_container_node_pool" "primary_nodes" {',
      '   name       = "${google_container_cluster.primary.name}-node-pool"',
      "   location   = var.region",
      "   cluster    = google_container_cluster.primary.name",
      "   node_count = var.gke_num_nodes",
      " ",
      "   node_config {",
      "       oauth_scopes = [",
      '           "https://www.googleapis.com/auth/logging.write",',
      '           "https://www.googleapis.com/auth/monitoring",',
      "       ]",
      " ",
      "       labels = {",
      "           env = var.project_id",
      "       }",
      " ",
      "       # preemptible  = true",
      '       machine_type = "n1-standard-1"',
      '       tags         = ["gke-node", "${var.project_id}-gke"]',
      "       metadata = {",
      '           disable-legacy-endpoints = "true"',
      "       }",
      "   }",
      "}",
    ],

    backend_store: [
      "terraform{",
      '   backend "gcs" {',
      '       bucket = "bucket_name"',
      '       prefix = "terraform/state"',
      "   }",
      "}",
    ],
    terraform_apply: [
      "$ terraform apply",/*
      " ",
      "Terraform used the selected providers to generate the following execution",
      "plan. Resource actions are indicated with the following symbols:",
      " + create",
      " ",
      "Terraform will perform the following actions:",
      " ",
      "     ..",
      " ",
      " Plan: 4 to add, 0 to change, 0 to destroy.",*/
    ],
    terraform_init: [
      "$ terraform init",
      /*
      " ",
      "Initializing the backend...",
      " ",
      'Successfully configured the backend "gcs"! Terraform will automatically',
      "use this backend unless the backend configuration changes.",*/
    ],
    kubernetes_entry: [
      "$ gcloud container clusters get-credentials $(terraform output -raw kubernetes_cluster_name) --region $(terraform output -raw region)",
      /*
      "Fetching cluster endpoint and auth data.",
      "kubeconfig entry generated for crypto-parser-350713-gke.",*/
    ],
    install_openfaas: [
      "$ arkade install openfaas -load-balancer",
      /*
      "Using Kubeconfig: /home/runner/.kube/config",
      "Client: x86_64, Linux",

      "..",

      'Release "openfaas" does not exist. Installing it now.',
      "NAME: openfaas",
      "LAST DEPLOYED: Tue Jun  7 09:09:58 2022",
      "NAMESPACE: openfaas",
      "STATUS: deployed",
      "REVISION: 1",
      "TEST SUITE: None",

      "..",*/
    ],
    openfaas_password: [
      'export PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="***.data.basic-auth-password***" | base64 --decode; echo)',
    ],
    openfaas_ip: [
      '$ export GATEWAY_IP=$(kubectl get service gateway-external -n openfaas -o jsonpath="{.status.loadBalancer.ingress[0].ip}")',
    ],
    openfaas_store: [
      "$ faas-cli store deploy 'NodeInfo' --gateway http://$GATEWAY_IP:8080",
    ],
    download_docker: [
      'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"',
    ],
    test_yaml: [
      "version: 1.0",
      "provider:",
      "   name: openfaas",
      "   gateway: http://${URL:-exampleco}:8080",
      "functions:",
      "   test:",
      "       lang: python3",
      "       handler: ./test",
      "       image: repository_name/test:latest",
    ],
    handler_py: [
      "def handle(req):",
      " ",
      '""" handle a request to the function',
      " ",
      "Args:",
      "req (str): request body",
      '"""',
      " ",
      'return "test function"',
    ],
    initialization_1: [
      "name: CI",
      " ",
      "# Controls when the workflow will run",
      "on:",
      "   # Triggers the workflow on push or pull request events but only for the main branch",
      " ",
      "   push:",
      "       branches: [ main ]",
      "   pull_request:",
      " ",
      "   # Allows you to run this workflow manually from the Actions tab",
      "   workflow_dispatch:",
      " ",
      "   jobs:",
      "       setup-and-deploy:",
      "           name: Setup and Deploy",
      "           runs-on: ubuntu-latest",
      " ",
      '# Add "id-token" with the intended permissions.',
      "   permissions:",
      "       contents: 'read'",
      "       id-token: 'write'",
      "   steps:",
    ],
    initialization_2: [
      "   - name: Checkout",
      "     uses: actions/checkout@v3",
      " ",
      "   - name: Terraform",
      "     uses: hashicorp/setup-terraform@v2",
      " ",
      "   - name: Sleep",
      "     uses: jakejarvis/wait-action@master",
    ],
    initialization_3: [
      "   - id: 'auth'",
      "     name: 'Authenticate to Google Cloud'",
      "     uses: 'google-github-actions/auth@v0'",
      "     with:",
      "         credentials_json: '${{ secrets.GCP_CREDENTIALS }}'",
      " ",
      "     # Setup gcloud CLI",
      "   - name: Set up Cloud SDK",
      "     uses: google-github-actions/setup-gcloud@v0",
      "   - name: 'Use gcloud CLI'",
      "     run: 'gcloud info'",
    ],
    initialization_4: [
      "   - name: Login to Docker Hub",
      "     uses: docker/login-action@v1",
      "     with:",
      "         username: ${{ secrets.DOCKER_HUB_USERNAME }}",
      "         password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}",
    ],
    create_cluster_1: [
      "   - name: Terraform Init",
      "     id: init",
      "     run: terraform init -lock=false",
      " ",
      "   - name: Terraform Plan",
      "     id: plan",
      "     run: terraform plan -no-color -lock=false",
      "     continue-on-error: true",
      " ",
      "   - name: Terraform Apply",
      "     run: terraform apply -auto-approve -lock=false",
    ],
    create_cluster_2: [
      "   - name: Get kubectl Connection",
      "     run: gcloud container clusters get-credentials crypto-parser-350713-gke --region  europe-west1",
      "     continue-on-error: true",
    ],
    create_cluster_3: [
      "   - name: Install Arkade",
      "     run: curl -sLS https://get.arkade.dev | sudo sh",
      " ",
      "   - name: Test Arkade",
      "     run: arkade --help",
      " ",
      "   - name: Install Openfaas",
      "     run: arkade install openfaas --load-balancer",
      "     continue-on-error: true",
    ],
    create_cluster_4: [
      "   - name: Sleep 2 min",
      "     run: sleep 120s",
      " ",
      "   - name: Get IP",
      '     run: echo GATEWAY_IP=$(kubectl get service gateway-external -n openfaas -o jsonpath="{.status.loadBalancer.ingress[0].ip}") >> $GITHUB_ENV',
      "     continue-on-error: true",
      " ",
      "   - name: Get Password",
      '     run: echo PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode; echo) >> $GITHUB_ENV',
      "     continue-on-error: true",
    ],
    create_cluster_5: [
      "   - name: Download open-faas cli",
      "     run: curl -sSL https://cli.openfaas.com | sudo -E sh",
      "     continue-on-error: true",
      " ",
      "   - name: Connect to Openfaas",
      "     run: echo -n ${{env.PASSWORD}} | faas-cli login --username admin --password-stdin --gateway http://${{env.GATEWAY_IP}}:8080",
      "     continue-on-error: true",
      " ",
      "   - name: Push Test function",
      "     run: faas-cli store deploy 'NodeInfo' --gateway http://${{env.GATEWAY_IP}}:8080",
      "     continue-on-error: true",
    ],
    add_function_1: [
      "   - name: Get kubectl Connection",
      "     run: gcloud container clusters get-credentials crypto-parser-350713-gke --region europe-west1",
      "     continue-on-error: true",
    ],
    add_function_2: [
      "   - name: Get IP",
      '     run: echo GATEWAY_IP=$(kubectl get service gateway-external -n openfaas -o jsonpath="{.status.loadBalancer.ingress[0].ip}") >> $GITHUB_ENV',
      "     continue-on-error: true",
      " ",
      "   - name: Get Password",
      '     run: echo PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode; echo) >> $GITHUB_ENV',
      "     continue-on-error: true",
    ],
    add_function_3: [
      "   - name: Download open-faas cli",
      "     run: curl -sSL https://cli.openfaas.com | sudo -E sh",
      "     continue-on-error: true",
      " ",
      "   - name: Connect to Openfaas",
      "     run: echo -n ${{env.PASSWORD}} | faas-cli login --username admin --password-stdin --gateway http://${{env.GATEWAY_IP}}:8080",
      "     continue-on-error: true",
      " ",
      "   - name: Upload function",
      "     run: URL=${{env.GATEWAY_IP}} faas-cli up -f test.yml",
    ],
  }),
};
</script>
