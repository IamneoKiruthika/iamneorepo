provider "google" {
  project = "myproject"  
  region  = "us-central1"
  //credentials = file("eminent-wares-413012-a03526ee2fd7.json")
}

resource "google_container_cluster" "primary" {
  name     = "project-cluster"
  location = "us-central1"

  remove_default_node_pool = true
  initial_node_count       = 1

  network_policy {
    enabled = true
  }

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 50
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  min_master_version = "latest"
}

resource "google_container_node_pool" "primary_nodes" {
  cluster    = google_container_cluster.primary.name
  name       = "default-pool"
  location   = "us-central1"

  node_count = 3

  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 50
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}
