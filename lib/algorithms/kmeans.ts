import { AlgorithmStep } from '@/types';

export interface Point {
  x: number;
  y: number;
  cluster?: number;
}

export interface Centroid {
  x: number;
  y: number;
  cluster: number;
}

export function generateRandomPoints(count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
    });
  }
  return points;
}

export function initializeCentroids(points: Point[], k: number): Centroid[] {
  const centroids: Centroid[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < k; i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * points.length);
    } while (usedIndices.has(randomIndex));

    usedIndices.add(randomIndex);
    const point = points[randomIndex];
    centroids.push({
      x: point.x,
      y: point.y,
      cluster: i,
    });
  }

  return centroids;
}

function euclideanDistance(p1: Point, p2: Point | Centroid): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function assignClusters(points: Point[], centroids: Centroid[]): Point[] {
  return points.map((point) => {
    let minDistance = Infinity;
    let closestCluster = 0;

    centroids.forEach((centroid) => {
      const distance = euclideanDistance(point, centroid);
      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = centroid.cluster;
      }
    });

    return { ...point, cluster: closestCluster };
  });
}

function updateCentroids(points: Point[], centroids: Centroid[]): Centroid[] {
  return centroids.map((centroid) => {
    const clusterPoints = points.filter((p) => p.cluster === centroid.cluster);

    if (clusterPoints.length === 0) {
      return centroid;
    }

    const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);

    return {
      x: sumX / clusterPoints.length,
      y: sumY / clusterPoints.length,
      cluster: centroid.cluster,
    };
  });
}

function centroidsEqual(c1: Centroid[], c2: Centroid[], threshold = 0.1): boolean {
  return c1.every((centroid, i) => {
    const distance = Math.sqrt(
      Math.pow(centroid.x - c2[i].x, 2) + Math.pow(centroid.y - c2[i].y, 2)
    );
    return distance < threshold;
  });
}

export function runKMeans(
  points: Point[],
  k: number,
  maxIterations = 20
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  // Step 0: Initial state
  steps.push({
    id: 0,
    description: `Initialize K-Means with ${points.length} points and k=${k} clusters`,
    state: {
      points: points.map((p) => ({ ...p, cluster: undefined })),
      centroids: [],
    },
  });

  // Step 1: Initialize centroids
  let centroids = initializeCentroids(points, k);
  steps.push({
    id: 1,
    description: `Randomly select ${k} initial centroids`,
    state: {
      points: points.map((p) => ({ ...p, cluster: undefined })),
      centroids: centroids,
    },
  });

  let currentPoints = [...points];
  let iteration = 0;

  while (iteration < maxIterations) {
    // Assign clusters
    const oldCentroids = [...centroids];
    currentPoints = assignClusters(currentPoints, centroids);

    steps.push({
      id: steps.length,
      description: `Iteration ${iteration + 1}: Assign each point to nearest centroid`,
      state: {
        points: currentPoints,
        centroids: centroids,
      },
    });

    // Update centroids
    const newCentroids = updateCentroids(currentPoints, centroids);

    steps.push({
      id: steps.length,
      description: `Iteration ${iteration + 1}: Update centroids to cluster means`,
      state: {
        points: currentPoints,
        centroids: newCentroids,
      },
    });

    // Check convergence
    if (centroidsEqual(centroids, newCentroids)) {
      steps.push({
        id: steps.length,
        description: `Converged! Centroids stabilized after ${iteration + 1} iterations`,
        state: {
          points: currentPoints,
          centroids: newCentroids,
        },
      });
      break;
    }

    centroids = newCentroids;
    iteration++;
  }

  if (iteration === maxIterations) {
    steps.push({
      id: steps.length,
      description: `Reached maximum iterations (${maxIterations})`,
      state: {
        points: currentPoints,
        centroids: centroids,
      },
    });
  }

  return steps;
}