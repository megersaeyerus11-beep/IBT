export default async function DishItem({ params }){
    const {id} = await params
    return(
        <div>
            {id}
        </div>
    )
}