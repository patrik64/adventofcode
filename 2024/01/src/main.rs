use std::collections::HashMap;

fn part1(input: &str) -> u32 {
    let res: Vec<_> = input
        .split('\n')
        .map(|line| line.split("   ").collect::<Vec<_>>())
        .collect();

    let mut first = res
        .iter()
        .map(|el| el[0].parse::<u32>().unwrap())
        .collect::<Vec<_>>();
    first.sort();

    let mut second = res
        .iter()
        .map(|el| el[1].parse::<u32>().unwrap())
        .collect::<Vec<_>>();
    second.sort();

    let it = first.iter().zip(second.iter());

    let mut sum = 0;
    for (x, y) in it {
        if x < y {
            sum += y - x;
        } else {
            sum += x - y;
        }
    }

    sum
}

fn part2(input: &str) -> u32 {
    let res: Vec<_> = input
        .split('\n')
        .map(|line| line.split("   ").collect::<Vec<_>>())
        .collect();

    let first = res
        .iter()
        .map(|el| el[0].parse::<u32>().unwrap())
        .collect::<Vec<_>>();

    let second = res
        .iter()
        .map(|el| el[1].parse::<u32>().unwrap())
        .collect::<Vec<_>>();

    let mut freq_vec: HashMap<u32, u32> = HashMap::new();

    for x in &second {
        let freq: &mut u32 = freq_vec.entry(*x).or_insert(0);
        *freq += 1;
    }

    let mut sum = 0;
    for x in first {
        let occ = freq_vec.get(&x).copied().unwrap_or(0);
        sum += x * occ;
    }
    sum
}

fn main() {
    println!("Part 1: {}", part1(include_str!("in.txt")));
    println!("Part 2: {}", part2(include_str!("in.txt")));
}

#[test]
fn test_part1() {
    assert_eq!(part1(include_str!("test.txt")), 11);
}

#[test]
fn test_part2() {
    assert_eq!(part2(include_str!("test.txt")), 31);
}
