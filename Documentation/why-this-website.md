---
title: 2. About (extended version)
description: documentation
published: true
date: 2022-11-14T11:18:21.042Z
tags: 
editor: markdown
dateCreated: 2022-11-11T16:35:52.829Z
---

# Why another wine scores website?

This website presents ~~yet~~ another approach to wines comparison, with the aim of providing a *fair* comparison between wines and building a database around it.

If you are interested in knowing why I think we need another method for wine comparison, here is your answer.

## How wines are compared

In the world of wine publishing there are currently two main methods of comparison between wines, which we may refer to as:

1. the Naive Score method
2. the Yearly Comparison method 

Please note these are not *neutral* and have been chosen as they pinpoint a perceived flaw of the comparison methodology.

### The Naive Score method 

The Naive Score method is used by websites like [Vivino](https://vivino.com), which will be used for illustration purposes. These websites aggregate user scores, compute an average value, and then show it back to users. This average value is completely *naive*: not weighted, not scaled, not aware of potential differences between wine types or regions. As an example, the quite obscure *Private Bin Sauvignon Blanc* from the New Zealander producer *Villa Maria* and a price of 11$ gets the same average score as *Vignes Blanches Pouilly-Fuissé* from the French producer *Jules Desjourneys* and a price of 41$.

Does such a comparison make sense? Well, maybe. Since both wines are made from the same grape they *should* be comparable in some way. At the same time we are trying to compare wines from different regions (different continents, actually), produced according to rules of different appellations, with different target audience, etc. If we take into account all these differences, then we might set up a *fair* comparison, otherwise we are just associating a random number to a wine via the computation of an average score.

This association is exactly what happens when the Naive Score method is applied in this way: random users assign scores from a scale to a wine; such scores are not associated with any grading guideline nor method - so they're actually just numbers, not scores - apart from the fact that a highr number is associated with a better (whatever that means) wine; scores are then aggregated and computed to give an average score.

A score built in this way does not have any descriptive meaning, nor add any information to the wine it is associated to.

### The yearly comparison method
Predating the time of wine score aggregators, there was the time of wine publications. Wine publications are often associated with yearly *wine guides*, where a selection of wines marketed in a certain year is listed and scored by an editorial board of experts, not just random users. In the light of a *fair* wines comparison, wine guides offer some major improvements over wine aggregators, like explaining how to interpret a score and ranking wines by type, appellation, region, etc.

However, most or all the comparisons found in wine guides are limited to wines marketed in the same year which lessens the guide convenience. Imagine you want to buy a wine from an appellation you don't know well and consult a wine guide. You find something interesting and start searching for sellers to buy the wine, but you don't find the vintage reviewed by the guide you consulted. At this point you can:

1. get other guides until you find one that has the right wine reviewed;
2. hope that the vintage you found will be as good as the one you read about in the guide and buy it blindly;
3. (assuming they are human) ask the wine seller

Option (1) is just irrational and option (3) is not geeky enough for this website; so we're left with option (2) which works only if the vintage you are looking for has actually been reviewed by some guide. Some times, however, the vintage you are looking for is not on any guide - if for some reason it has not been reviewed - or *can't* yet be on any guide, for example if it will be on the next year guide, but you need to buy it now. 

In this last scenario (you need to decide over a wine that has not yet been reviewed) what could be an helpful tool to make up your mind? A time series. A time series would give you an overview of a wine performances over the years, so that you may get to a better understanding on what to expect from its new vintage. If the time series shows you that a wine have always had excellent performances, chances that the new vintage will be good increase. If, on the other hand, the time series shows you that a specific wine has had mostly average result and a single excellent vintage, than you know that you're trying your luck by buying it. 

The yearly format of wine guides made this line of reasoning difficult, from *completely impossible* to *unpractical*.

The database shown in this website was made with the goal of overcoming the Yearly Comparison method just described. 
 