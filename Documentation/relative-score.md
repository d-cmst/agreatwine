---
title: 2. Relative Score
description: 
published: true
date: 2022-11-15T10:31:34.694Z
tags: 
editor: markdown
dateCreated: 2022-11-14T15:21:00.990Z
---

# Relative Scores

## TL; DR
In a *AGReATWine* wines are classified and ranked by a **Relative Score (RS)**  assigned to each wine, computed from **evalutations** based on **grades** from selected expert publications.

## Wine Grades
A wine grade is a number from a predefined range assigned to a wine and representing its quality according to the reviewer. Robert Parker's reviewers assign grades in a range from 0 to 100, where 100 describes the best possible outcome of a review. In *AGReATWine* experts publications (Robert Parker's Wine Advocate is probably the best known example of such a publication) are considered sources for grades, specifically a subset of them. 

### Grades, classes and evaluations
To qualify as a source for grades a wine publication must meet the following criterion: allow for grades to be distributed over five classes according to a rule provided by the publication itself. So, for example, assuming that a publication grades wine on a 0-100 range, a possible, made-up classification could be:

- E (a grade in the 0-50 range): a wine with at least one major flaw
- D (a grade in the 51-75 range): a wine with no major flaws and no strengths 
- C (a grade in the 76-85 range): a wine with at least one major strength
- B (a grade in the 86-92 range): a wine with at least two major strengths
- A (a grade in the 93-100 range): a wine with at least three major strengths

It does not really matter how a specific publication define "strengths" or "flaws" as long as a definition is provided or can be inferred. 

A given (by the reviewer) classification is needed to aggregate grades on for two reasons: (i) some reviewers only disclose the wines class and not their grade and (ii) estimating the grade from the class is easier than estimating the class from the grade.  

Assuming the above classification, a wine with a grade of 78 falls in the "C" class and gets an **evaluation** of 3/5. In *AGReATWine* evaluations are always styled with a star after the digit, in this case: 3★.

### Sources selection
Not all sources who qualify (i.e. offer a classification of grades) are used in *AGReATWine*: some are excluded for the lack of resources needed to scrape them from their original medium (website, mobile app, traditional publication, etc.); some others cannot be used because their classification is inconsistent with the others and turn out to be difficult/impossible to aggregate. Details about source selection are provided where the selection happens, which is usually at the country level.

## Evaluations aggregation and weighted averages

Let's assume we have the following evaluations for a wine called *Wine A* and we want to compute it's **Relative Score**: 


|_Wine A_| Source A | Source B | Source C |
|----|----------:|----------:|----------:|
|2019|    3     |    4     |    3     |
|2020|    3     |    3     |    3     |
|2021|    4     |    3     |    3     |
{.dense}

As a first step, we need to get the average of the evaluations for each vintage year and the average of these averages, which we'll call **raw average**:

|_Wine A_| Source A | Source B | Source C | Avg |
|----|----------:|----------:|----------:|----:|
|2019|    3     |    4     |    3     | 3.33|
|2020|    3     |    3     |    3     | 3   |
|2021|    4     |    3     |    3     | 3.33|
|**RawAvg**||||**3.22**|
{.dense}

This value should not be used to compare or rank wines as it has many limitations. Imagine the following scenario involving Wine B and Wine C 

<table>
<tr><td>

|_Wine B_| Source A | Source B | Source C | Avg | 
|----|----------:|----------:|----------:|-----:|
|2019|    3      |    3      |    3      | 3    |
|2019|    3      |    3      |    3      | 3    |
|2019|    3      |    3      |    3      | 3    |
|2020|    3      |    3      |    3      | 3    |
|2021|    4      |    4      |    4      | 4    |
|**RawAvg**||||**3.2**|
{.dense}

</td><td>  
  
|_Wine C_| Source A | Source B | Source C | Avg | 
|----|----------:|----------:|----------:|-----:|
|2019|    -      |    -      |    -      | na   |
|2019|    -      |    -      |    -      | na   |
|2019|    -      |    -      |    -      | na   |
|2020|    -      |    -      |    -      | na   |
|2021|    4      |    -      |    -      | 4    |
|**RawAvg**||||**4**|
{.dense}
  
</td></tr> </table>

Wine C gets a better raw average because we lack information on many of its vintages, which is not the outcome we would expect. In a slightly different scenario where *Wine A* has an evaluation of 3 for all the five years, while *Wine C* has an evaluation of 3 for year 2021 and no evaluation for other years; we would still not get the expected outcome, as _Wine C_ would get the same raw average of _Wine B_.  

Lack of information about a wine may have several different causes:

- the wine is not marketed every year;
- the missing vintages were so bad that the producer decided not to send them out to wine publications;
- the wine has just entered the market for the first time;
- etc.

Whatever the reason, we should take the lack of information into account while evaluating a wine. The general assumption made here follows the principle that no information is worse than bad information (in this case, no review is worse than a bad review) and so the lack of information gets weighted negatively while evaluating a wine. 

To express this principle mathematically, the **Relative Score** computation uses a more complex formula than the raw average. The formula can be splitted in three parts:

1. each vintage year average evaluation is summed up with the number of reviews in each class for that same year, multiplied by a different constant for each class.
2. this sum of sums is averaged and weighted over the sum of number of reviews for each class multiplied by the highest possible evaluation value (i.e.: 5);
3. part three will be described after explaining the first two.

These first two steps can be written in a more formal fashion in the following way:


$$
\frac{\sum_{i=1}^{avg} x_i + (ev_5 \times 1000) + (ev_4 \times 333.3) + (ev_3 \times 111.1) + (ev_2 \times 37)}{5\times (ev_5 \times 1000) + 5 \times (ev_4 \times 333.3) +  5  \times (ev_3 \times 111.1) + 5 \times (ev_2 \times 37)} = wa
$$

where $avg$ is the number of yearly average evaluations a wine has; $ev_n$ is the number of evaluations of class $_n$ in the same year and $wa$ is the resulting weighted average of the wine.

The constants (1000, 333.3, 111.1 and 37) have been chosen so that a wine needs three evaluations of the lesser classes to a single evaluation of the greater class. As an example, a wine with an evaluation of 3 for 2019, 2020, 2021, will get the same relative score of a wine with a single evaluation of 4 in any year and no other evaluations. If we apply this formula to the example illustrated by the tables above, _Wine B_ gets a **Relative Score** of "2.36" while _Wine C_ gets "1". This is consistent with our intuition that _Wine B_ should get a better evaluation since it has more reviews and the same maximum evaluation. A similarly more intuitive result would be provided in other scenarios where the lack of information skewes the raw average calculation.

## The Relative Score

Le'ts go back to part 3 of the **Relative Score** computation:

3. the weighted average is expressed in a 0-100 range, where 100 stands for the best weighted average obtained by a wine in the same category as the current wine.

We take the weighted average and transform it to a percentage, where 100 stands for the best weighted average. A more formal version of this computation is:

$$
\frac{wa\times 5}{\underset{wa\in n}{max} f(wa)\times 100} = RS
$$

where $n$ is the set of all weighted averages of the wines we are ranking. The outcome of this computation is the **Relative Score**, which tells how a wine performs with respect of other wines of the same category, or more specifically with respect to the **best** wine in the same cateogory.

You can read on about [how are wine categories populated](/Documentation/wine-categories) 