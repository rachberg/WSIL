

def setDictKeys(countries) :
	infile_countries = open('countries_by_name.txt', 'r')
	for line in infile_countries :
		key = line.rstrip()
		countries[key] = {}	

def setDictValues(countries):
	files = {}
	#gdp_per_capita = open('gdp_per_capita.txt', 'r')
	files.update({"GDP" : 'gdp_per_capita.txt'})
	#gender_gap_index = open('gender_gap_index.txt', 'r')
	files.update({"Gender Gap" : 'gender_gap_index.txt'})

	setData(countries, files)
	addContinent(countries)

#setData takes a infile with a list of coutries and associated index 
#for infile 
def setData(countries, infiles):
	#updates each "value component" in the country dict
	for key, fname in infiles.iteritems() :
		component = key
		with open(fname) as f:
			lines = f.readlines()
			f.close()
		for line in lines:
			country, index = line.rsplit(None, 1)
			index = float(index)
			if (country != 'Maximum'):
				index = index / countries['Maximum'][component]
			countries[country].update({component: index})

	#divide all values by the max index to get relative indices
	#for key, field in countries.iteritems() :
	#	for component in field


#add 'continent field'
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
# indices for some values and returns a score based on the 
# list of values passed as input
def scoreCountries(countries, values_list):
	num_val = len(values_list)
	countries_by_score = {}

	for country in countries:
		scores = countries[country]
		weighted_score = 0
		for component in values_list:
			if component in scores:
				weighted_score += scores[component]/num_val
				print(country + ' ' + str(weighted_score))
		countries_by_score.update({country : weighted_score})

	return countries_by_score

countries = {}
setDictKeys(countries)
setDictValues(countries)
countries_by_score = scoreCountries(countries, ['Gender Gap', 'GDP'])
print(countries)
