//const tfplan = require('D:/Iamneo2024/Terraform/terraform_1.8.3_windows_amd64/gcpk8s/terraform/tfplan.json');
const tfplan = require('/home/coder/project/workspace/terraform/tfplan.json');


function findResource(resourceType, resourceName) {
    const resources = tfplan.planned_values.root_module.resources;
    return resources.find(resource => resource.type === resourceType && resource.name === resourceName);
}

function verifyClusterName(expectedClusterName) {
    const cluster = findResource('google_container_cluster', 'primary');
    if (cluster) {
        console.log(`Found cluster name: ${cluster.values.name}`);
        return cluster.values.name === expectedClusterName;
    } else {
        console.log('Cluster not found');
        return false;
    }
}

function verifyRegion(expectedRegion) {
    const cluster = findResource('google_container_cluster', 'primary');
    if (cluster) {
        console.log(`Found region: ${cluster.values.location}`);
        return cluster.values.location === expectedRegion;
    } else {
        console.log('Cluster not found');
        return false;
    }
}

function verifyNetworkPolicy(expectedNetworkPolicy) {
    const cluster = findResource('google_container_cluster', 'primary');
    if (cluster) {
        const networkPolicy = cluster.values.network_policy[0];
        console.log(`Found network policy: ${JSON.stringify(networkPolicy)}`);
        return networkPolicy.enabled === expectedNetworkPolicy;
    } else {
        console.log('Network policy not found');
        return false;
    }
}

function verifyNodePoolConfiguration(expectedNodePoolName, expectedMachineType, expectedNodeCount, expectedMinNodeCount, expectedMaxNodeCount, expectedDiskSize) {
    const nodePool = findResource('google_container_node_pool', 'primary_nodes');
    if (nodePool) {
        console.log(`Found node pool: ${JSON.stringify(nodePool.values)}`);
        return nodePool.values.name === expectedNodePoolName &&
               nodePool.values.node_config[0].machine_type === expectedMachineType &&
               nodePool.values.node_count === expectedNodeCount &&
               nodePool.values.autoscaling[0].min_node_count === expectedMinNodeCount &&
               nodePool.values.autoscaling[0].max_node_count === expectedMaxNodeCount &&
               nodePool.values.node_config[0].disk_size_gb === expectedDiskSize;
    } else {
        console.log('Node pool not found');
        return false;
    }
}

test('Cluster Name Verification', () => {
    const expectedClusterName = 'project-cluster';
    const result = verifyClusterName(expectedClusterName);
    console.log('Cluster Name Test Passed:', result);
    expect(result).toBe(true);
});

test('Region Verification', () => {
    const expectedRegion = 'us-central1';
    const result = verifyRegion(expectedRegion);
    console.log('Region Test Passed:', result);
    expect(result).toBe(true);
});

test('Network Policy Verification', () => {
    const expectedNetworkPolicy = true;
    const result = verifyNetworkPolicy(expectedNetworkPolicy);
    console.log('Network Policy Test Passed:', result);
    expect(result).toBe(true);
});

test('Node Pool Configuration Verification', () => {
    const expectedNodePoolName = 'default-pool';
    const expectedMachineType = 'e2-medium';
    const expectedNodeCount = 3;
    const expectedMinNodeCount = 1;
    const expectedMaxNodeCount = 5;
    const expectedDiskSize = 50;
    const result = verifyNodePoolConfiguration(expectedNodePoolName, expectedMachineType, expectedNodeCount, expectedMinNodeCount, expectedMaxNodeCount, expectedDiskSize);
    console.log('Node Pool Configuration Test Passed:', result);
    expect(result).toBe(true);
});
