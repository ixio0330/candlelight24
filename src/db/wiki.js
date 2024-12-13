'use server'

import createSupabase from '@/supabase'

export const getAllPeople = async () => {
  try {
    const supabase = createSupabase()

    // wiki_people에서 party_id가 1인 사람들 가져오기
    const { data: people, error: peopleError } = await supabase
      .from('wiki_people')
      .select('id, name, region, count, party_id')
      .eq('party_id', 1)

    if (peopleError) {
      console.error('Error fetching people data:', peopleError)
      return
    }

    const { data: voteResults, error: voteResultsError } = await supabase
      .from('wiki_vote_results')
      .select('vote_id, person_id, status')
      .in(
        'person_id',
        people?.map((person) => person.id),
      )

    if (voteResultsError) {
      console.error('Error fetching vote results:', voteResultsError)
      return
    }

    const voteIds = voteResults?.map((result) => result.vote_id)
    const { data: votes, error: votesError } = await supabase
      .from('wiki_votes')
      .select('id, date, name')
      .in('id', voteIds)

    if (votesError) {
      console.error('Error fetching votes data:', votesError)
      return
    }

    const combinedData = people?.map((person) => {
      const personVoteResults = voteResults.filter(
        (result) => result.person_id === person.id,
      )
      const personVotes = personVoteResults?.map((result) => {
        const vote = votes?.find((vote) => vote.id === result.vote_id)
        return { ...result, ...vote }
      })

      return { ...person, votes: personVotes }
    })

    return combinedData ?? []
  } catch (error) {
    console.log(error)
    return null
  }
}
