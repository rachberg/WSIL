import cgi


#sets the keys of the dictionary 'countries'
def setDictKeys(countries) :
	infile_countries = open('countries_by_name.txt', 'r')
	for line in infile_countries :
		key = line.rstrip()
		countries[key] = {}	

def setDictValues(countries):
	#dictionary of files to get data from
	single_files = {}
	single_files.update({"GDP" : ['+', 'gdp_per_capita.txt']})
	single_files.update({"Gender Gap" : ['+', 'gender_gap_index.txt']})
	single_files.update({"Homicide Rate" : ['-', 'homicide_rate.txt']})

	mult_files = {}
	#mult_files.update{"Safety": [ ['-', 'homicide_rate.txt'], ['+', 'political_stability.txt']}

	# set data indices (0-1) and continent to each country when
	# info is available
	setSingleData(countries, single_files)
	#setMultData(countries, mult_files)
	addContinent(countries)

#setData takes a infile with a list of coutries and associated index 
#for infile 
def setSingleData(countries, infiles):
	# updates each "value component" in the country dict
	# lst is a list of length 2, with a '+' or a '-' (do we 
	# want to maximize or minimize component) and a file name
 	for key, lst in infiles.iteritems() :
		component = key
		fname = lst[1]
		# reads file line by line and puts them into a list
		with open(fname) as f:
			lines = f.readlines()
			f.close()
		# each country gets an index for given component
		for line in lines:
			country, index = line.rsplit(None, 1)
			index = float(index)
			if (country != 'Maximum'):
				# divide by Max to get a relative index
				index = index / countries['Maximum'][component]
				# inverse index if we want to minimize it
				if lst[0] == '-':
					index = 1 - index
			countries[country].update({component: index})


def setMultleData(countries, infiles):
	# updates each "value component" in the country dict
	# lst is a list of length 2, with a '+' or a '-' (do we 
	# want to maximize or minimize component) and a file name
 	for key, lst_files in infiles.iteritems() :
		component = key
		length = len(lst_files)
		index = 0
		for infile in lst_files:
			fname = infile[1]
			# reads file line by line and puts them into a list
			with open(fname) as f:
				lines = f.readlines()
				f.close()
			# each country gets an index for given component
			for line in lines:
				country, weighted_index = line.rsplit(None, 1)
				weighted_index = float(index)
				if (country != 'Maximum'):
					# divide by Max to get a 0 - 1 index
					weighted_index = weighted_index / countries['Maximum'][component]
					# inverse index if we want to minimize it
					if infile[0] == '-':
						weighted_index = 1 - weighted_index
					weighted_index = weighted_index/length
				countries[country][component] += weighted_index


#add 'continent field' in the dictionary 'countries'
def addContinent(countries):
	infile = open('countries_by_continent.txt', 'r')
	curr_continent = ''
	for line in infile:
		country = line.strip()
		if (country == 'Africa' or country == 'Europe' or country == 'North America' or country == 'Asia' or country == 'South America' or country == 'Oceania') :
			curr_continent = country
		else :
			countries[country].update({'cont':curr_continent})


# scoreCountries takes as input a dictionary of countries with
# indices for some values and returns a score dict based on the 
# list of values passed as input
def scoreCountries(countries, values_list):
	num_val = len(values_list)
	countries_by_score = {}

	for country in countries:
		if country == 'Maximum' : break
		scores = countries[country]
		weighted_score = 0
		for component in values_list:
			if component in scores:
				weighted_score += scores[component]/num_val
		countries_by_score.update({country : weighted_score})

	return countries_by_score

countries = {}
setDictKeys(countries)
setDictValues(countries)
countries_by_score = scoreCountries(countries, ['Gender Gap', 'GDP'])
print(countries)
