function initMeans(data, k) {
	var means = [];
	
	var idx = [];
	while (idx.length < k) {
		var j = Math.floor(Math.random() * data.length);
		if (idx.indexOf(j) === -1)
			idx.push(j);
	}
	
	for (var i = 0; i < k; i++) {
		means.push(data[idx[i]]);
	}

    return means;
};

function makeAssignments(data, means) {
	var assignments = [];
	
    for (var i in data)
    {
        var point = data[i];
        var distances = [];

        for (var j in means)
        {
            var mean = means[j];
            var sum = 0;

            for (var dimension in point)
            {
                var difference = point[dimension] - mean[dimension];
                difference *= difference;
                sum += difference;
            }

            distances[j] = Math.sqrt(sum);
        }
		
		var idx = 0, curMin = distances[0];
		for (var p = 1; p < distances.length; p++) {
			if (distances[p] < curMin) {
				idx = p;
				curMin = distances[p];
			}
		}
        assignments[i] = idx;
		//assignments[i] = distances.indexOf( Math.min.apply(null, distances) );
    }
	
	return assignments;
}

function moveMeans(data, means, assignments) {
    var sums = Array( means.length );
    var counts = Array( means.length );
    var moved = false;

    for (var j in means)
    {
        counts[j] = 0;
        sums[j] = Array( means[j].length );
        for (var dimension in means[j])
        {
            sums[j][dimension] = 0;
        }
    }

    for (var point_index in assignments)
    {
        var mean_index = assignments[point_index];
        var point = data[point_index];
        var mean = means[mean_index];

        counts[mean_index]++;

        for (var dimension in mean)
        {
            sums[mean_index][dimension] += point[dimension];
        }
    }

    for (var mean_index in sums)
    {
        for (var dimension in sums[mean_index])
        {
            sums[mean_index][dimension] /= counts[mean_index];
        }
    }
	
	return sums;
}

function kmeans(data, k) {
    var means = initMeans(data, k);

	while (true)
	{
		assignments = makeAssignments(data, means);
		
		var newMeans = moveMeans(data, means, assignments);
		if (means.toString() === newMeans.toString())
		{
			break;
		}
		else
		{
			means = newMeans;
		}
	}
    
	return [assignments, means];
}